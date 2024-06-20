const { validateInput } = require('../services/commonService');
const authService = require('../services/authService');

// Create
exports.login = async (req, res) => {
    const body = req.body;

    // Validate request
    const validate = validateInput(body,{
        username : 'string',
        password : 'string',
    });

    if(!validate.status) {
        return res.status(400).json(validate);
    }

    try {

        const login = await authService.login(body);

        return res.status(200).json({
            status: true,
            message: 'success login',
            data: login,
        });
    } catch (err) {
        return res.status(err.code ? err.code : 500).send({
            status: false,
            message: err.message
        });
    }
};