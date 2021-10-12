'use strict';


const getCreateCommunity = async (req,res,next) =>{
    var cookie =req.cookies.id;
    if(cookie){
         try{
        res.sendFile(__dirname+"/public/community.html");
    } catch(error){
        res.status(400).send(error.message);
    } 
    }
    else{
    res.redirect("/adminpanel");
    }
}
const getHome = async (req,res,next) =>{
    var cookie =req.cookies.id;
    if(cookie){
        try{
            // console.log(req.cookies.id);
            res.sendFile(__dirname+"/public/home.html");
        } catch(error){
            res.status(400).send(error.message);
        }
    }
    else{
    res.redirect("/adminpanel");
    }
  
}
const getCommunities = async (req,res,next) =>{
    var cookie =req.cookies.id;
    if(cookie){
     try{
            res.render("communities");
        } catch(error){
            res.status(400).send(error.message);
        }   
    }
    else{
    res.redirect("/adminpanel");
    }  
}
const getEditCommunities = async (req,res,next) =>{
    var cookie =req.cookies.id;
    if(cookie){
        try{
            //    res.send(req.params.id);
                console.log(req.params.id);
                res.render("communityEdit",{id:req.params.id});
            } catch(error){
                res.status(400).send(error.message);
            }   
    }
    else{
    res.redirect("/adminpanel");
    }
 
}
const deleteCommunity = async (req,res,next) =>{
    var cookie =req.cookies.id;
    if(cookie){
        try{
            console.log(req.params.id);
            res.render("communities");
        } catch(error){
            res.status(400).send(error.message);
        }   
    }
    else{
    res.redirect("/adminpanel");
    }
 
}
const getCreateBasket = async (req,res,next) =>{
    var cookie =req.cookies.id;
    if(cookie){
        try{
            res.sendFile(__dirname+"/public/basket.html");
        } catch(error){
            res.status(400).send(error.message);
        }
         
    }
    else{
    res.redirect("/adminpanel");
    }
  
}
const getEditBasket = async (req,res,next) =>{
    var cookie =req.cookies.id;
    if(cookie){
        try{
            res.render("basketEdit",{id:req.params.id});
        } catch(error){
            res.status(400).send(error.message);
        }         
    }
    else{
    res.redirect("/adminpanel");
    }
  
}
const getBaskets = async (req,res,next) =>{
    var cookie =req.cookies.id;
        if(cookie){
            try{
                res.render("baskets");
            } catch(error){
                res.status(400).send(error.message);
            }             
        }
        else{
        res.redirect("/adminpanel");
        }
}
const login = async (req,res,next) =>{

    var cookie =req.cookies.id;
        if(cookie){
            res.redirect("/adminpanel/home")   
        }
        else{
            try{
                res.render("login",{error:"null"});
         
             } catch(error){
                 res.status(400).send(error.message);
             }
        }
}


module.exports = {
    getCreateCommunity,
    getHome,
    getCommunities,
    getEditCommunities,
    getBaskets,
    getCreateBasket,
    getEditBasket,
    login
    // deleteCommunity
    // login
}