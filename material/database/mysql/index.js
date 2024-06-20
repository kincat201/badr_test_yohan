const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');

const basename = path.basename(__filename)
const env = process.env.NODE_ENV
const {
    db: {
        database, username, password, host, dialect, define, dialectOptions, logging, pool,
    },
} = config

const db = {}

const sequelize = new Sequelize(
    database, username, password, {
        host,
        dialect /** dialect mysql || postgres || mssql */,
        define,
        dialectOptions,
        logging,
        pool,
    },
)

fs
    .readdirSync(path.join(process.cwd(), '/database/mysql/models'))
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = require(path.join(path.join(process.cwd(), '/database/mysql/models', file)))(sequelize, DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize

module.exports = db