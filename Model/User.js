const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    resetToken:String
});
module.exports = mongoose.model("Users" ,usersSchema);