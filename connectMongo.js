const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log("database connect")
        } catch (error) {
        console.log(error)
        }
}

module.exports = connectDB


