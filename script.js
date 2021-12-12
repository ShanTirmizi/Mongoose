const mongoose = require('mongoose');
const User = require('./User');


// The functions will be called evertime we connect to a server
mongoose.connect('mongodb://localhost/testdb', () => {
    console.log('connected to mongodb');
}, e => console.log(e));


// const run = async () => {
//     // Two ways of creating users 
//     // 1. Using the new keyword
//     // const user = new User({
//     // name: 'John',
//     // age: 30
//     // })
//     // 2. Using the create method
//     const user = await User.create({
//         name: 'John',
//         age: 30
//     });


//     // Upadte a user 
//     user.name = 'Mike';
//     await user.save();

//     await user.save()
//     console.log(user);
// }
// const run = async () => {
//     // creating a bit more complicated user
//     try {
//         const user = await User.create({
//         name: 'John',
//         age: 20,
//         email: "zi@test.COM",
//         hobbies: ['Sports', 'Cooking'],
//         address: {
//             street: 'Main St',
//             city: 'Boston',
//         }
//     });

//         await user.save()
//         console.log(user);
//     } catch (error) {
//         console.log(error.message);
//     }


// }

const run = async () => {
    // Query Basics
    // populate adds that data to the user
    try {
        const user = await User.where("age").gt(19).where("name").equals("John").populate("bestFriend").limit(1)
        // user[0].bestFriend = "61b60e142623d89fabf6796c"
        // user[0].email = "hello@gmail.com"
        // user[0].save()
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }


}



run()