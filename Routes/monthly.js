require("dotenv").config();
const mongoose =  require('mongoose');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Monthly = require('../Models/monthly.js');
const nodemailer = require('nodemailer');

// post request to create a new monthly
router.post('/add', 
async (req, res) => {
    const { email, date, todo, birthday, goal, shopping, important, monthlyMotto} = req.body;
    try {
        // find the user by email
        const monthlyData = await Monthly.findOne({email: email, date: date});
        if(monthlyData) {
            // delete the monthlyData
            await Monthly.deleteOne({email: email, date: date});
        }   
        let monthly = new Monthly({
            email: email,   
            date: date,
            todo: todo,
            birthday: birthday,
            goal: goal,
            shopping: shopping,
            important: important,
            monthlyMotto: monthlyMotto
        });
        monthly = await monthly.save();
        res.json(monthly);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// get request to get all the monthly data by email
router.post('/get',
async (req, res) => {
    const {email, date} = req.body;
    try {
        const monthlyData = await Monthly.find({email: email, date: date});
        res.json(monthlyData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;