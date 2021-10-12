'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const config = require('./config');
const studentRoutes = require('./routes/student-routes');
const communityRoutes = require('./routes/community-routes');
const basketRoutes = require('./routes/basket-routes');
const getRoutes = require('./routes/get-routes');
const loginRoutes = require('./routes/login-routes');
var cookieParser = require('cookie-parser');
var fileupload = require("express-fileupload");


// app.use(session({
//   secret:hBFU8MvnBvT8KpQxNMV1bzOvHuEuHEIaKeoeGUAyBFdRaBXWM31cfe3fFTlV,
//   resave:false,
//   saveUninitialized:true
// }))
const app=express();
app.use(fileupload());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
  }));
app.use(express.urlencoded({
    extended:true
  }));
app.use(cookieParser());
const User = require('./models/student');


// const bcrypt=require('bcrypt');
// const flash=require('express-flash');
// const session=require('express-session');

// const passport=require("passport");
// const initializePassport=require('./public/passport-config');

// initializePassport(passport,email=>{
//   users.find(user=>user.email===email),
//   id=>users.find(user=>user.id===id)
// });

// const users=[];

// app.use(flash());
// app.use(session({
//   secret:process.env.SESSION_SECRET,
//   resave:false,
//   saveUninitialized:false
// }))
// app.use(passport.session());


app.use('/adminpanel', getRoutes.routes);
app.use('/adminpanel', loginRoutes.routes);
app.use('/api', studentRoutes.routes);
app.use('/apic', communityRoutes.routes);
app.use('/apib', basketRoutes.routes);

app.get('/adminpanel',(req,res)=>{
  res.redirect("/adminpanel/login");
})

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
