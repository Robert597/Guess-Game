const express = require("express");
const route = express.Router();
const controller = require("../controllers/gameController");

route.get("/", controller.getUser);
route.post("/", controller.postUser);
route.put("/", controller.updateUser);

module.exports = route