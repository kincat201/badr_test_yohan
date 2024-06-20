const moment = require('moment');
const { Op } = require('sequelize');
const { user, material, transaction } = require('../database/mysql/index');

class TransactionService {
    async detail(id) {
        return await transaction.findOne(
            {
                where:{
                    id,
                    deleted_at: {[Op.is]:null}
                },
                include:[
                    {
                        model: user,
                        as: 'customer',
                        attributes: ['id','username']
                    },
                    {
                        model: user,
                        as: 'vendor',
                        attributes: ['id','username']
                    },
                    {
                        model: material,
                        as: 'material',
                        attributes: ['id','name']
                    },
                ]
            });
    }

    async getAll() {
        return await transaction.findAll({
            where:{
                deleted_at: {[Op.is]:null}
            },
            include:[
                {
                    model: user,
                    as: 'customer',
                    attributes: ['id','username']
                },
                {
                    model: user,
                    as: 'vendor',
                    attributes: ['id','username']
                },
                {
                    model: material,
                    as: 'material',
                    attributes: ['id','name']
                },
            ]
        });
    }

    async save(body) {
        let data = new transaction();

        if(body.id){
           data = await transaction.findByPk(body.id);
            if(!data) throw { status : false, message: 'data not found!', code: 400 };
        }else{
            data.created_at = moment();
        }

        data.updated_at = moment();
        data.transaction_date = body.transaction_date;
        data.customer_id = body.customer_id;
        data.vendor_id = body.vendor_id;
        data.material_id = body.material_id;

        return await data.save();
    }

    async delete(id) {
        const data = await transaction.findByPk(id);
        if(!data) throw { status : false, message: 'data not found!', code: 400 };
        if(data.deleted_at) throw { status : false, message: 'data already deleted!', code: 400 };

        data.deleted_at = moment();
        return await data.save();
    }

}

module.exports = new TransactionService()
