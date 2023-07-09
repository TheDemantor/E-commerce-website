import bcrypt from 'bcryptjs';
var users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true,
    },
    {
        name: 'Anshul',
        email: 'anshul@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,
    },
    {
        name: 'Arpita',
        email: 'arpita@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,
    }

];

export default users;

