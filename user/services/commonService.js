const moment = require('moment');

class CommonService {
    validateInput(input, validation, errorMessage) {

        for(const key in validation) {
            if(typeof input[key] === 'undefined' || input[key] === '') {
                return {
                    status: false,
                    message: errorMessage && errorMessage[key] ? errorMessage[key] : key + ' is required'
                }
            } else if(validation[key] instanceof Array) {
                const type = validation[key][0];
                if(input[key] instanceof Array !== true) {
                    return {
                        status: false,
                        message: errorMessage && errorMessage[key] ? errorMessage[key] : key + ' must be array of ' + type + ' only'
                    };
                }
                if(!input[key].every((value) => { return typeof value === type })) {
                    return {
                        status: false,
                        message: errorMessage && errorMessage[key] ? errorMessage[key] : key + ' must be array of ' + type + ' only'
                    };
                }
            } else if(typeof input[key] !== validation[key]) {
                return {
                    status: false,
                    message: errorMessage && errorMessage[key] ? errorMessage[key] : key + ' must be ' + validation[key]
                }
            }
        }
        return { status: true };
    }
}

module.exports = new CommonService();