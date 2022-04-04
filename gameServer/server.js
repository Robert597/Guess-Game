const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./Model/dbcon.js");
const PORT = process.env.PORT || 5500;
require("dotenv").config();
const path = require("path");

app.use(cors({origin: "*", credentials: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

connectDB();
app.get("/", (req, res) => {
    return res. status(201).sendFile(path.join(__dirname, "views", "index.html"));
})
app.use("/controllers", require("./Route/route"));
app.get("*", (req, res) => {
    return res.send("Error, page not found");
 })

mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log("Port is opened on:" + PORT);
    })
})

