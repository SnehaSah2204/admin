'use strict';

const { request } = require('express');
const firebase = require('../db');
const Basket = require('../models/basket');
const firestore = firebase.firestore();


const addBasket = async (req, res, next) => {
    try {
        const data = req.body;
        var stks=[];
        var file = req.files[0];
        var src = req.body.src;
        var tag=req.body.tag;
        var stocks=[];
        if ((typeof(data.stocks))=== 'string') {
            stocks=([data.stocks].flat());
        }
        else{
           for(var i =0; i<data.stocks.length; i++){
            if(data.stocks[i]!=""){
                stocks.push(data.stocks[i]);
            }
        }
        }
        var fbdata = {
            name:data.name,
            author:data.author,
            stocks:stocks,
            description:data.Description,
            photo:src,
            official: true,
            tag :tag,
            member: []
        }
        await firestore.collection('baskets').doc().set(fbdata);
        // res.send(fbdata);
        res.redirect("/apib/baskets");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllBaskets = async (req, res, next) => {
    try {
        const baskets = await firestore.collection('baskets');
        const data = await baskets.get();
         const basketArray = [];
        if(data.empty) {
            res.status(404).send('No basket record found');
        }else {
            data.forEach(doc => {
                // res.send(doc);
                    const basket = new Basket(
                    doc.id,
                    doc.data().photo,
                    doc.data().stocks,
                    doc.data().name,
                    doc.data().description,
                    doc.data().author,
                    doc.data().tag  
                );
                basketArray.push(basket);
            });
            // res.send(basketArray);
            res.render("baskets",{baskets: basketArray});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBasket = async (req, res, next) => {
    try {
        const id = req.params.id;
        const basket = await firestore.collection('baskets').doc(id);
        const data = await basket.get();
        if(!data.exists) {
            res.status(404).send('basket with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateBasket = async (req, res, next) => {
    try {
        const id = req.params.id;
        const basket =  await firestore.collection('baskets').doc(id);
        const data = await basket.get();
        const dataSet=data.data(); 
        var name="",description,photo,author,tag;
        var astks = [];
        var rstks=[];
        var stocks=[];
  
        if(req.body.name){
             name=req.body.name;
        }
        else{
             name=dataSet.name;
        }
        if(req.body.author){
            author=req.body.author;
       }
       else{
            author=dataSet.author;
       }
        if(req.body.description){
            description=req.body.description;
       }
       else{
           description=dataSet.description;
       }
       if(req.body.tag){
        tag=req.body.tag;
       }
      else{
       tag=dataSet.tag;
       }
        if(req.body.src){
            photo=req.body.src;
       }
       else{
           photo=dataSet.photo;
       }
    if(req.body.removestocks){
    if (typeof req.body.removestocks === 'string') {
        var removeThis=req.body.removestocks;
        dataSet.stocks.forEach(stk=>{
            var flag=false;
            if(stk==removeThis || stk==""){
                flag=true;
            }
            if(flag==false){
                stocks.push(stk);
            }
        })
    }
    else {
        dataSet.stocks.forEach(stk=>{
            var flag=false;
            req.body.removestocks.forEach(rstk=>{
                if(stk==rstk || stk=="")
                flag=true;
            })
            if(flag==false){
                stocks.push(stk);
            }
        })
        
    }
}
else{
    dataSet.stocks.forEach(stk=>{
        stocks.push(stk);
    })
    }

    if(req.body.addstocks){
        if (typeof req.body.addstocks === 'string') {
            var addThis=req.body.addstocks;
            stocks.push(addThis);
          }   
        else {
      req.body.addstocks.forEach(stk=>{
          if(stk!="")
          stocks.push(stk);
      })
    }}
    else{
        dataSet.stocks.forEach(stk=>{
            stocks.push(stk);
        })
    }
   
            var fbdata = {
            name:name,
            author:author,
            stocks:stocks,
            description:description,
            photo:photo,
            official: true,
            tag :tag,
            member: []
        }
        // res.send(fbdata);
        await basket.update(fbdata);
        res.redirect("/apib/baskets");
        // res.send('basket record updated successfuly');  
       
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteBasket = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('baskets').doc(id).delete();

        res.redirect("/apib/baskets");
        // res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addBasket,
    getAllBaskets,
    getBasket,
    updateBasket,
    deleteBasket
}