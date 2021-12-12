const mongoose = require('mongoose');
const User = require('./User');


// The functions will be called evertime we connect to a server
mongoose.connect('mongodb://localhost/testdb', () => {
    console.log('connected to mongodb');
}, e => console.log(e));


const run = async () => {
    // Two ways of creating users 
    // 1. Using the new keyword
    // const user = new User({
    // name: 'John',
    // age: 30
    // })
    // 2. Using the create method
    const user = await User.create({
        name: 'John',
        age: 30
    });


    // Upadte a user 
    user.name = 'Mike';
    await user.save();

    await user.save()
    console.log(user);
}

run()