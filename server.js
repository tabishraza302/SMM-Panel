require("dotenv").config();
require("./src/models/associations");

const app       = require("./src/app");
const Database  = require("./src/config/database.config");

const PORT = process.env.PORT || 3001;

// Establish database connection and start the web server
(async () => {
    try {
        await Database.sync(({ force: false, alter: false}));
        app.listen(PORT, () => console.log(`\n\n\nServer started at port ${PORT}\n\n\n`))
    } catch(error) {
        console.log({error});
    }
})()