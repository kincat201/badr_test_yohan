module.exports = app => {

    //define middleware for protect api
    const verifyToken = require('../middlewares/authenticate');

    //define controller
    const transaction = require("../controllers/transaction.js");

    var router = require("express").Router();

    // Create a new transaction
    router.post("/transaction",[verifyToken], transaction.create);
    // Retrieve all transactions
    router.get("/transaction",[verifyToken], transaction.findAll);
    // Retrieve a single transaction with id
    router.get("/transaction/:id",[verifyToken], transaction.findOne);
    // Update a transaction with id
    router.put("/transaction/:id",[verifyToken], transaction.update);
    // Delete a transaction with id
    router.delete("/transaction/:id",[verifyToken], transaction.delete);
    
    app.use('/api', router);
};