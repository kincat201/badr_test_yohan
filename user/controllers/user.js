const userService = require("../services/userService");
const { validateInput } = require('../services/commonService');

// Create and Save a new User
exports.create = async (req, res) => {
    const body = req.body;

    // Validate request
    const validate = validateInput(body,{
        username : 'string',
    });
    if(!validate.status) {
        return res.status(400).json(validate);
    }

    try {

        const user = await userService.save(body);

        return res.status(200).json({
            status: true,
            message: 'success create user',
            data: user,
        });
    } catch (err) {
        console.log(err);
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
    try {
        const users = await userService.getAll();

        return res.status(200).json({
            status:true,
            message: 'success get all users',
            data: users,
        });
    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userService.detail(id);

        if(!user){
            return res.status(400).send({
                status: false,
                message: 'user not found!'
            });
        }
        return res.status(200).send({
            status: true,
            message: `success get user by id`,
            data:user,
        });

    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Update a User by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Validate request
    const validate = validateInput(body,{
        username : 'string',
    });
    if(!validate.status) {
        return res.status(400).json(validate);
    }
    body.id = id;

    try {

        const user = await userService.save(body);

        return res.status(200).send({
            status: true,
            message: `success update user`,
            data:user,
        });

    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userService.delete(id);

        return res.status(200).send({
            status: true,
            message: `success delete user`,
            data:user,
        });

    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};