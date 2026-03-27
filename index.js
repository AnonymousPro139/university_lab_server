import express from 'express'
import cors from 'cors';
import my_db from './database/index.js';
import MySelect, { insertUser } from './database/utils.js';


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

app.post('/', async (req, res) => {
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



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
