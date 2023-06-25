const app = require("./app");

const dotenv = require('dotenv');
const database = require("./config/database");

//config
dotenv.config({path: "backend/config/config.env"});


database()

app.listen(process.env.PORT,()=>{

    console.log(`Server is woking on http://localhost: ${process.env.PORT}`)
})