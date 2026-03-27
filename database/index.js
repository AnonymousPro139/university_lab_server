import { Sequelize } from 'sequelize';

const my_db = new Sequelize('course_lesson',
    'root',
    '', 
    {
    host: 'localhost',
    dialect: "mysql"
    });

export default my_db