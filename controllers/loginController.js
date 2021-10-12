'use strict';

const { request } = require('express');
const passport = require('passport');
const firebase = require('../db');
const firestore = firebase.firestore();

// const isLogged=async (req,res,next)=>{
//     var cookie =req.cookies.id;
//     if(cookie){
//     console.log(cookie); 
//     }
//     else{
//     res.redirect("/adminpanel");
//     }
//     } 

const logout=async (req,res,next)=>{
    res.clearCookie("id");
    res.redirect("/adminpanel/login");
    } 

const login = async (req, res, next) => {
        const users=[]
        // res.send(req.body); 
        try {
            const id=req.body.id;
            const student = await firestore.collection('users').doc(id);
            const data = await student.get();
            if(!data.exists) {
                // res.status(404).send('Student with the given ID not found');
                res.render("login",{error:"User does not exist"});
            }else {
                // res.send(data.data());
                if(req.body.password==data.data().password)
                {
                    // setting the cookie for storing users id 
                    res.cookie('id', id, { maxAge: 900000, httpOnly: true });
                    res.redirect("/adminpanel/home");
                }
                else{
                    res.render("login",{error:"Password do not match"});
                }
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
        // passport.authenticate(local,{
        //     successRedirect:'/adminpanel/home',
        //     failureRedirect:'/adminpanel/login',
        //     failureFlash:true
        // });
}


module.exports = {
    login,
    logout
}

// res.clearCookie('cookiename');

// to read the cookie 
// var cookie = getcookie(req);
// console.log(cookie)