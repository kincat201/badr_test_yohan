module.exports = app => {

    //define middleware for protect api
    const verifyToken = require('../middlewares/authenticate');

    //define controller
    const user = require("../controllers/user.js");
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/user",[verifyToken], user.create);
    // Retrieve all Users
    router.get("/user",[verifyToken], user.findAll);
    // Retrieve a single User with id
    router.get("/user/:id",[verifyToken], user.findOne);
    // Update a User with id
    router.put("/user/:id",[verifyToken], user.update);
    // Delete a User with id
    router.delete("/user/:id",[verifyToken], user.delete);

    //auth login
    router.post("/login",auth.login);
    
    app.use('/api', router);
};