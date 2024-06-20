const transactionService = require("../services/transactionService");
const { validateInput } = require('../services/commonService');

// Create and Save a new transaction
exports.create = async (req, res) => {
    const body = req.body;

    // Validate request
    const validate = validateInput(body,{
        customer_id : 'number',
        vendor_id : 'number',
        material_id : 'number',
        transaction_date : 'string',
    });
    if(!validate.status) {
        return res.status(400).json(validate);
    }

    try {

        const transaction = await transactionService.save(body);

        return res.status(200).json({
            status: true,
            message: 'success create transaction',
            data: transaction,
        });
    } catch (err) {
        console.log(err);
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Retrieve all transactions from the database.
exports.findAll = async (req, res) => {
    try {
        const transactions = await transactionService.getAll();

        return res.status(200).json({
            status:true,
            message: 'success get all transactions',
            data: transactions,
        });
    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Find a single transaction with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const transaction = await transactionService.detail(id);

        if(!transaction){
            return res.status(400).send({
                status: false,
                message: 'transaction not found!'
            });
        }
        return res.status(200).send({
            status: true,
            message: `success get transaction by id`,
            data:transaction,
        });

    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Update a transaction by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Validate request
    const validate = validateInput(body,{
        customer_id : 'number',
        vendor_id : 'number',
        material_id : 'number',
        transaction_date : 'string',
    });
    if(!validate.status) {
        return res.status(400).json(validate);
    }
    body.id = id;

    try {

        const transaction = await transactionService.save(body);

        return res.status(200).send({
            status: true,
            message: `success update transaction`,
            data:transaction,
        });

    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Delete a transaction with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const transaction = await transactionService.delete(id);

        return res.status(200).send({
            status: true,
            message: `success delete transaction`,
            data:transaction,
        });

    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};