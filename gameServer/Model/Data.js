const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const data = new Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("GAMER", data);