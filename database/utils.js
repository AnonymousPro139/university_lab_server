import { QueryTypes } from 'sequelize';
import md5 from 'md5';

const MySelect = async (my_db) => {
    const users = await my_db.query('SELECT * FROM User', {
        type: QueryTypes.SELECT
    });

    console.log("MY USERS:", users);
}


export const insertUser = async (my_db, name, phone, password) => {
    // password cryptography hash hiih
    const my_encrypted_pass =  md5(password);
    console.log('ENCRYPTED PASS:',my_encrypted_pass );

    await my_db.query(
        'INSERT INTO `user` (`name`, `phone`, `password`) VALUES (:name, :phone, :password)',
        {
            replacements: {
                name: name,
                phone: phone, // replace with your variable name
                password: my_encrypted_pass // ideally hashed!
            },
            type: QueryTypes.INSERT
        }
    );
    console.log('INSERTED DATA');
}

export const checkUserByPassword = async (my_db, my_sent_phone, my_sent_password) => {
    const person = await my_db.query(
        'SELECT * FROM user WHERE phone = :phone LIMIT 1',
        {
            replacements: { phone: my_sent_phone },
            type: QueryTypes.SELECT,
            plain: true
            
        }
    );
    console.log('PERSON:', person);

    const mySentPassHash = md5(my_sent_password); // minii web-s ilgeesen passwordiin hash n!
    console.log('mySentPassHash:', mySentPassHash);

    if(person.password == mySentPassHash){
        // amjilttai newtruulne
        return true
    } else {
        // newtruulehgui!!!
        return false
    }
   
}

export const getMyNames = async ( my_db, myphone) => {

    const results = await my_db.query(
        'SELECT * FROM names WHERE phone = :phone LIMIT 1',
        {
            replacements: { phone: myphone },
            type: QueryTypes.SELECT,
            plain: true
        }
    );

    console.log('ovog____ner:', results);

    return results;
}

export default MySelect









