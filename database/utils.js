import { QueryTypes } from 'sequelize';


const MySelect = async (my_db) => {
    const users = await my_db.query('SELECT * FROM User', {
        type: QueryTypes.SELECT
    });

    console.log("MY USERS:", users);
}

const MySelect2 = () => {

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



export default MySelect









