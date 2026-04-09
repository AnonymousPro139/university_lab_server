import express from 'express'
import cors from 'cors';
import { getJWT, verifyJWT } from './auth/index.js';
import my_db from './database/index.js';
import MySelect, { insertUser, checkUserByPassword } from './database/utils.js';


const app = express()
app.use(cors())

// 2. Middleware to parse JSON bodies (this is the "parsing" part)
app.use(express.json());


try {
  await my_db.authenticate();
  console.log('Ugugdliin san amjilttai holbogdloo');

  await MySelect(my_db);

} catch (error) {
  console.error('DB deer aldaa garlaa:', error);
}


app.get('/', (req, res) => {
  res.send('GET request!')
})

app.post('/register', async (req, res) => {
  console.log('POST HUSELT IRLEEE');

  // The parsed data lives in req.body
  const { username123, email123, password123 } = req.body;

  // console.log('Received registration data:');
  console.log('Username:', username123);
  console.log('Email:', email123);
  console.log('Password:', password123);

  await insertUser(my_db, username123, email123, password123)

  res.send({
    status: 200,
    ok: true,
    message: "Hii SERVEREES hariulj bna",
  })
})

app.post('/login', async (req, res) => {
  console.log('Login HUSELT IRLEEE');

  const { phone, password } = req.body;

  console.log('phone:', phone);
  console.log('password:', password);

  // Odoo tuhain hereglegch bga esehiig DB-eesee haiy
  let results = await checkUserByPassword(my_db, phone, password);

  if (results.id) {
    // End token olgoh ajil hiine 

    const myToken = getJWT("123", "user", phone);

    console.log('MYTOKEN::', myToken);

    // const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsInJvbGUiOiJ1c2VyIiwibmFtZSI6Ijk5MTIzNDU2IiwiaWF0IjoxNzc1MjAwOTAwLCJleHAiOjE3NzUyODczMDB9.8_wKB1op3YTON9nm-eMGc8GgUEEt4msaXK7r4zS5RBQ";
    // const isVerified = verifyJWT(testToken);
    // console.log('isVerified:', isVerified);

    res.send({
      status: 200,
      token: myToken,
      ok: true,
      message: "Snu, Ta amjilttai tur newterlee",
    })
  } else {
    res.send({
      status: 200,
      ok: true,
      message: "Uuchlaarai, Tany erh hurehgui bna!",
    })
  }


})



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
