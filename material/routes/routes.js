module.exports = app => {

    //define middleware for protect api
    const verifyToken = require('../middlewares/authenticate');

    //define controller
    const material = require("../controllers/material.js");

    var router = require("express").Router();

    // Create a new Material
    router.post("/material",[verifyToken], material.create);
    // Retrieve all Materials
    router.get("/material",[verifyToken], material.findAll);
    // Retrieve a single Material with id
    router.get("/material/:id",[verifyToken], material.findOne);
    // Update a Material with id
    router.put("/material/:id",[verifyToken], material.update);
    // Delete a Material with id
    router.delete("/material/:id",[verifyToken], material.delete);
    
    app.use('/api', router);
};