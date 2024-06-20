const moment = require('moment');
const { Op } = require('sequelize');
const { material } = require('../database/mysql/index');

class MaterialService {
    async detail(id) {
        return await material.findOne({where:{
            id,
            deleted_at: {[Op.is]:null}
        }});
    }

    async getAll() {
        return await material.findAll({
            where:{
                deleted_at: {[Op.is]:null}
            }
        });
    }

    async save(body) {
        let data = new material();

        if(body.id){
           data = await material.findByPk(body.id);
            if(!data) throw { status : false, message: 'data not found!', code: 400 };
        }else{
            data.created_at = moment();
        }

        data.updated_at = moment();
        data.name = body.name;

        return await data.save();
    }

    async delete(id) {
        const data = await material.findByPk(id);
        if(!data) throw { status : false, message: 'data not found!', code: 400 };
        if(data.deleted_at) throw { status : false, message: 'data already deleted!', code: 400 };

        data.deleted_at = moment();
        return await data.save();
    }

}

module.exports = new MaterialService()
