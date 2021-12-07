require("dotenv").config();
const mongoose =  require('mongoose');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Daily = require('../Models/daily.js');
const nodemailer = require('nodemailer');

// post request to create a new daily
router.post('/add', 
async (req, res) => {
    const {email, date, work, family, selfcare, thoughts, highlights, greatful, notes, workRate, familyRate, selfcareRate, dailyAffirmation, madeBetterToday } = req.body;
    try {
        // find the user by email
        const dailyData = await Daily.findOne({email: email, date: date});
        if(dailyData) {
            // delete the dailyData
            await Daily.deleteOne({email: email, date: date});
        }   
        let daily = new Daily({
            email: email,
            date: date,
            work: work,
            family: family,
            selfcare: selfcare,
            notes: notes,
            workRate: workRate,
            familyRate: familyRate,
            selfcareRate: selfcareRate,
            thoughts: thoughts,
            highlights: highlights,
            greatful: greatful,
            dailyAffirmation: dailyAffirmation,
            madeBetterToday: madeBetterToday
        });
        daily = await daily.save();
        res.json(daily);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// get request to get all the daily data by email
router.get('/get',
async (req, res) => {
    const {email, date} = req.body;
    try {
        const dailyData = await Daily.find({email: email, date: date});
        res.json(dailyData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;