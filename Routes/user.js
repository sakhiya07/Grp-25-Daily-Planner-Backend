require("dotenv").config();
const mongoose =  require('mongoose');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/user.js');
const nodemailer = require('nodemailer');

//user register
router.post("/register",
    [
        check("name","Please enter a valid name").notEmpty(),
        check("email","Please enter a valid email").isEmail(),
        check("password","Please enter a valid password").isLength({
            min:8
        }),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const response = {
                ok:false,
                data:{
                },
                err:{
                    status:400,
                    msg:errors.errors[0].msg     
                }
            }
            return res.send(response);
        }

        try{
            
            let user = await User.findOne({email:req.body.email});
            if(user){
                const response = {
                    ok:false,
                    data:{
                    },
                    err:{
                        status:400,
                        msg:"User already exist"    
                    }
                }
                return res.send(response);
            }

            user = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                picURL:"",
                following:[], 
                followers:[],
                recipe:[],
                liked:[],
                saved:[]
            });

            //password encryption
            const salt = await bcrypt.genSalt(10);
            const hashedPASS = await bcrypt.hash(req.body.password,salt);

            user.password = hashedPASS;
            
            const savedUser = await user.save();
            const response = {
                    ok:true,
                    data:{
                        status:200,
                        msg:"User has been registered",
                        user:savedUser
                    },
                    err:{
                    }
                }
            res.send(response);

        }catch(err){
            const response = {
                ok:false,
                data:{
                },
                err:{
                    status:400,
                    msg:err.message   
                }
            }
            console.log(response);
            res.send(response);
        }
});


//user login
router.post("/login",
    [
        check("email","Please enter a valid email").isEmail(),
        check("password","Please enter a valid password").isLength({
            min:8
        })
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const response = {
                ok:false,
                data:{
                },
                err:{
                    status:400,
                    msg:errors.errors[0].msg     
                }
            }
            return res.send(response);
        }

        try{
            
            const user = await User.findOne({email:req.body.email});
            if(!user){
                const response = {
                    ok:false,
                    data:{
                    },
                    err:{
                        status:400,
                        msg:"User is not registered"    
                    }
                }
                return res.send(response);
            }

            const validPASS = await bcrypt.compare(req.body.password,user.password);
            if(!validPASS){
                const response = {
                    ok:false,
                    data:{
                    },
                    err:{
                        status:400,
                        msg:"Password is not valid"   
                    }
                }
                return res.send(response);
            }
            
          
            const response = {
                ok:true,
                data:{
                    status:200,
                    msg:"User logged in",
                    user:user
                },
                err:{
                }
            }
            res.send(response);

        }catch(err){
            const response = {
                ok:false,
                data:{
                },
                err:{
                    status:400,
                    msg:err.message 
                }
            }
            console.log(response);
            res.send(response);
        }
});

module.exports = router;