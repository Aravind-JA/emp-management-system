const express = require('express');
const ejs = require('ejs');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

connectDb();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

/////////////////////////////////////////////////////
app.use('/Assets', express.static(path.resolve(__dirname, "Assets")));
app.use('/CSS', express.static(path.resolve(__dirname, "Assets/CSS")));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/employee/:id", (req, res) => {
    res.render("employee.ejs"); 
});

////////////////////////////////////////////////////


//middlewares
app.use(express.json(),
    cors({
        origin: "http://localhost:8080",
    }));



app.use("/employees", require("./routes/employeeRoutes.js"));
app.use("/users", require("./routes/UserRoutes.js"));
app.use("/employees", require("./routes/imageRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server started running at 8080...");
});