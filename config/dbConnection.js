const mongoose = require('mongoose');

// connect MongoDB to Server 
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MongoUrl);
        // console.log("database connected: ", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;