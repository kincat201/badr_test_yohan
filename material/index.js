const express = require("express");
const cors = require("cors");

const db = require('./database/mysql');

const port = process.env.PORT;

const app = express();
var corsOptions = {
    origin: "http://localhost:"+port
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});
require("./routes/routes.js")(app);
// set port, listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

async function main(){
    // open connection to mongodb server
    db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
    // add handle for cors pre-flight
    app.options('*', cors()); // include before other routes
}

main();

module.exports = app