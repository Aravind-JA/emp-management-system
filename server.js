const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectDb();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/employees", require("./routes/EmployeeRoutes.js"));
// app.use("/users", require("./routes/UserRoutes.js"));
app.use(errorHandler);


app.listen(port, () => {
    console.log("Server started running at 8080");
});