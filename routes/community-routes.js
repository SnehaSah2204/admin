const express = require('express');
const {
    addCommunity,
    getAllCommunities,
    getCommunity,
    updateCommunity,
    deleteCommunity,
} = require('../controllers/communityController');

const router = express.Router();

router.post('/community', addCommunity);
router.get('/communities', getAllCommunities);
router.get('/community/:id', getCommunity);
router.post('/community/:id', updateCommunity);
router.get('/community/delete/:id', deleteCommunity);

// router.post('/login',login);


module.exports = {
    routes: router
}