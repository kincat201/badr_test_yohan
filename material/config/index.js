require('dotenv').config();

module.exports = {
    auth: {
        username: process.env.AUTH_USERNAME,
        password : process.env.AUTH_PASSWORD,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        session: false,
        expiresIn: 86400,
        issuer: 'YOHAN',
        audience: 'USRA',
        algorithm: 'HS256',
    },
    db: {
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            // prevent sequelize from pluralizing table names
            freezeTableName: true,
            underscored: true,
        },
        //logging: console.log,
    },
};
