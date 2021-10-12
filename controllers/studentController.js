'use strict';

const firebase = require('../db');
const User = require('../models/student');
const firestore = firebase.firestore();


const addStudent = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const students = await firestore.collection('users');
        const data = await students.get();
        const studentsArray = [];
        if(data.empty) {
            res.status(404).send('No user record found');
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().dob,
                    doc.data().email,
                    doc.data().name,
                    doc.data().otp,
                    doc.data().otpExpiredTime,
                    doc.data().password,
                    doc.data().phone,
                    doc.data().profileId,
                    doc.data().profilePic
                );
                studentsArray.push(user);
            });
            res.send(studentsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('users').doc(id);
        const data = await student.get();
        if(!data.exists) {
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const student =  await firestore.collection('users').doc(id);
        await student.update(data);
        res.send('Student record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
}