const express = require('express');
const app = express();

app.use(express.json());

//route import
const product = require("./routes/productRoute");

app.use("/api/v1",product);

module.exports =app;