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

// creating a method for each instance of out userSchema

userSchema.methods.sayHi = function() {
    console.log(`Hello ${this.name}`)
}

// static method
// this creates our own find method
userSchema.statics.findByName = function(name) {
    // regex makes it case insensitive
    return this.find({name: new RegExp(name, 'i')})
}

// adding stuff to querys 
userSchema.query.byName = function(name) {
    return this.where({name: new RegExp(name, 'i')})
}

// Virtaul -- Dosnt get saved in the database
userSchema.virtual("namedEmail").get(function() {
    return `${this.name} <${this.email}>`
})

// Middleware
    // do something before saving
userSchema.pre('save', function(next) {
    // console.log('pre save')
    this.updatedAt = Date.now()
    next()
})

    // do something after saving
    // doc is the document that was just saved
userSchema.post('save', function(doc, next) {
    // console.log('post save')
    doc.sayHi()
    next()
})


module.exports = mongoose.model('User', userSchema);
