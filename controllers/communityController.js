'use strict';

const { response } = require('express');
const firebase = require('../db');
const Community = require('../models/community');
//const { getStorage, ref, uploadBytes } = require("firebase/storage");
const firestore = firebase.firestore();

// var upload = async(file)=>{
//     var storage = getStorage();
//     const storageRef = ref(storage, 'images/community');
//     // var ref = firebase.storage().ref('images/community');
//     const name = new Date()+'-'+file.name ;
//     const metadata = {
//         contentType:file.type
//     }
//     let uploadTask = storageRef.child(name).put(file,metadata)

//     uploadTask.then(async(snap) =>{
//         return await snap.storageRef.getDownloadURL()
//         //console.log(src);
//     })
//     console.log("uploaded");

// }


const addCommunity = async (req, res, next) => {
    try {
        // res.send("milgaya");
        const data = req.body;
        var arr = [];
        for(var i =0; i<data.Admin.length; i++){
            if(data.Admin[i]!=""){
                arr.push(data.Admin[i]);
            }
        }
        const chat = data.message=="on"?true:false;
        const post = data.post=="on"?true:false;
        var file = req.files[0];
        var src = req.body.src;

      
        var fbdata = {
            name:data.name,
            admin:arr,
            description:data.Description,
            photo:src,
            official: true,
            ischatable : chat,
            ispostable : post,
            member: []
        }
        console.log(fbdata);
        // res.send(fbdata);
        await firestore.collection('communities').doc().set(fbdata);
        res.redirect("/apic/communities");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllCommunities = async (req, res, next) => {
    try {
        const communities = await firestore.collection('communities');
        const data = await communities.get();
        const communityArray = [];
        if(data.empty) {
            res.status(404).send('No community record found');
        }else {
            data.forEach(doc => {
                const community = new Community(
                    doc.id,
                    doc.data().photo,
                    doc.data().author,
                    doc.data().name,
                    doc.data().description,
                    doc.data().admin,
                    doc.data().ischatable,
                    doc.data().ispostable,
                    doc.data().member,
                    doc.data().offcial
                );
                communityArray.push(community);
            });
            // res.send(communityArray);
            res.render("communities",{communities: communityArray});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCommunity = async (req, res, next) => {
    try {
        const id = req.params.id;
        // res.send(id);

        const community = await firestore.collection('communities').doc(id);
        const data = await community.get();
        if(!data.exists) {
            res.status(404).send('Community with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCommunity = async (req, res, next) => {
    try {
        // res.send(data.data());
        // console.log(req.body);
        const id = req.params.id;
        const community = await firestore.collection('communities').doc(id);
        const data = await community.get();
        var admin=[];
        const dataSet=data.data(); 
        var name="",description,photo;
        var arr = [];
        var rarr=[];
        console.log(dataSet);
        if(req.body.name){
             name=req.body.name;
        }
        else{
             name=dataSet.name;
        }
        if(req.body.description){
            description=req.body.description;
       }
       else{
           description=dataSet.description;
       }
        if(req.body.src){
            photo=req.body.src;
       }
       else{
           photo=dataSet.photo;
       }
        const chat = req.body.message=="on"?true:false;
        const post = req.body.post=="on"?true:false;
    //    res.send(req.body);
    
        if(req.body.removeadmin){
            for(var i =0; i<req.body.removeadmin.length; i++){
                if(req.body.removeadmin[i]!=""){
                    rarr.push(req.body.removeadmin[i]);
                }
            }
           dataSet.admin.forEach(ad=>{
               var flag=false;
               rarr.forEach(rad=>{
                   if(ad==rad)
                   flag=true;
               })
               if(flag==false){
                   admin.push(ad);
               }
           })
        }
        else{
        dataSet.admin.forEach(ad=>{
            admin.push(ad);
        })
        }
        if(req.body.addadmin){
        for(var i =0; i<req.body.addadmin.length; i++){
            if(req.body.addadmin[i]!=""){
                arr.push(req.body.addadmin[i]);
            }
        }
            arr.forEach(ad=>{
            admin.push(ad);
            })
        }

        var fbdata = {
            name:name,
            admin:admin,
            description:description,
            photo:photo,
            official: true,
            ischatable : chat,
            ispostable : post,
            member: dataSet.member
        }

        // res.send(fbdata);
        // const fbdata = req.body;
        // const community =  await firestore.collection('communities').doc(id);
        await community.update(fbdata); //<-- instead of data use fbdata
        res.redirect("/apic/communities");
        res.send('community record updated successfuly');

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCommunity = async (req, res, next) => {
    try {
        const id = req.params.id;
        // console.log(id+ "sneha");
        // res.send(id);
        await firestore.collection('communities').doc(id).delete();
        res.redirect("/apic/communities");

    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addCommunity,
    getAllCommunities,
    getCommunity,
    updateCommunity,
    deleteCommunity,
}