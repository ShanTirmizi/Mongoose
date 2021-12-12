const mongoose = require('mongoose');

// How to Create a Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('User', userSchema);
