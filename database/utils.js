import { QueryTypes } from 'sequelize';


const MySelect = async (my_db) => {
    const users = await my_db.query('SELECT * FROM User', {
        type: QueryTypes.SELECT
    });

    console.log("MY USERS:", users);
}


export const insertUser = async (my_db, name, phone, password) => {
    await my_db.query(
        'INSERT INTO `user` (`name`, `phone`, `password`) VALUES (:name, :phone, :password)',
        {
            replacements: {
                name: name,
                phone: phone, // replace with your variable name
                password: password // ideally hashed!
            },
            type: QueryTypes.INSERT
        }
    );
    console.log('INSERTED DATA');
}

export const checkUserByPassword = async (my_db, my_sent_phone, my_sent_password) => {

    const results = await my_db.query(
        'SELECT * FROM user WHERE phone = :phone AND password = :password LIMIT 1',
        {
            replacements: { phone: my_sent_phone, password: my_sent_password },
            type: QueryTypes.SELECT,
            plain: true
            
        }
    );

    console.log('RESULT:', results);

    return results;
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









