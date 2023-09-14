const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log(`mongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(error);
        process.hasUncaughtExceptionCaptureCallback(1);
        // process.exit(1);

    }
}

module.exports = connectDB;