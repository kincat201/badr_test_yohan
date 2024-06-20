const moment = require('moment');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const {
    auth: { username, password},
    jwt :{ secret, expiresIn, issuer, audience, algorithm }
} = require('../config/index');

const jwtOptions = {
    expiresIn, issuer, audience, algorithm,
}

class AuthService {
    async login(body) {
        if(body.username == username && body.password == password){

            const lastLogin = moment();
            let token;

            if(!token){

                // generate jwt token
                token = jwt.sign({
                    username,
                    lastLogin,
                }, secret, jwtOptions);
            }

            return {
                username,
                lastLogin,
                token,
            };

        }else{
            throw { status : false, message : 'invalid credential', code: 401 };
        }
    }
}

module.exports = new AuthService();