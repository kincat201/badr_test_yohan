const moment = require('moment');
const { Op } = require('sequelize');
const { user } = require('../database/mysql/index');

class UserService {
    async detail(id) {
        return await user.findOne({where:{
            id,
            deleted_at: {[Op.is]:null}
        }});
    }

    async getAll() {
        return await user.findAll({
            where:{
                deleted_at: {[Op.is]:null}
            }
        });
    }

    async save(body) {
        let data = new user();

        if(body.id){
           data = await user.findByPk(body.id);
            if(!data) throw { status : false, message: 'data not found!', code: 400 };
        }else{
            data.created_at = moment();
        }

        data.updated_at = moment();
        data.username = body.username;

        return await data.save();
    }

    async delete(id) {
        const data = await user.findByPk(id);
        if(!data) throw { status : false, message: 'data not found!', code: 400 };
        if(data.deleted_at) throw { status : false, message: 'data already deleted!', code: 400 };

        data.deleted_at = moment();
        return await data.save();
    }

}

module.exports = new UserService()
