const materialService = require("../services/materialService");
const { validateInput } = require('../services/commonService');

// Create and Save a new material
exports.create = async (req, res) => {
    const body = req.body;

    // Validate request
    const validate = validateInput(body,{
        name : 'string',
    });
    if(!validate.status) {
        return res.status(400).json(validate);
    }

    try {

        const material = await materialService.save(body);

        return res.status(200).json({
            status: true,
            message: 'success create material',
            data: material,
        });
    } catch (err) {
        console.log(err);
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Retrieve all materials from the database.
exports.findAll = async (req, res) => {
    try {
        const materials = await materialService.getAll();

        return res.status(200).json({
            status:true,
            message: 'success get all materials',
            data: materials,
        });
    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Find a single material with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const material = await materialService.detail(id);

        if(!material){
            return res.status(400).send({
                status: false,
                message: 'material not found!'
            });
        }
        return res.status(200).send({
            status: true,
            message: `success get material by id`,
            data:material,
        });

    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Update a material by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    // Validate request
    const validate = validateInput(body,{
        name : 'string',
    });
    if(!validate.status) {
        return res.status(400).json(validate);
    }
    body.id = id;

    try {

        const material = await materialService.save(body);

        return res.status(200).send({
            status: true,
            message: `success update material`,
            data:material,
        });

    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};

// Delete a material with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const material = await materialService.delete(id);

        return res.status(200).send({
            status: true,
            message: `success delete material`,
            data:material,
        });

    }catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};