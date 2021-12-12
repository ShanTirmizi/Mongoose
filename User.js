const mongoose = require('mongoose');

// How to Create a Schema
// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String,
//     createdAt: Date,
//     updatedAt: Date,
//     bestFriend: mongoose.SchemaTypes.ObjectId,
//     hobbies: [String],
//     address: {
//         street: String,
//         city: String,
//     }
// })

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
})

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v % 2 === 0,
            message: 'Age must be even'
        }
    },
    email: {
        type: String,
        minlength: 5, 
        required: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema
})

module.exports = mongoose.model('User', userSchema);
