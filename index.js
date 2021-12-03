const express = require('express');
require("dotenv").config();
const db = require('./db.js');

const cors = require('cors');
const morgan = require("morgan");
const nodemailer = require('nodemailer');
const sgmail = require('@sendgrid/mail');

// Routes
const userRouter = require('./Routes/user.js');
const dailyRouter = require('./Routes/daily.js');
const monthlyRouter = require('./Routes/monthly.js');

const app = express();


app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.urlencoded({extended: false}));
app.use(express.json());


db();

app.get("/",(req,res) => {
    res.send("Hello From Express");
})

app.use("/user",userRouter);
app.use("/daily",dailyRouter);
app.use("/monthly",monthlyRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));