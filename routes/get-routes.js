const express = require('express');
const { deleteCommunity } = require('../controllers/communityController');
const {getCreateCommunity,getHome,getEditCommunities,login,getCommunities} = require('../controllers/getrouteController');
const {getCreateBasket,getEditBasket} = require('../controllers/getrouteController');
const {logout} = require('../controllers/loginController');

const router = express.Router();

router.get('/createcommunity',getCreateCommunity);
router.get('/home',getHome);
router.get('/communities/:id',getEditCommunities);
router.get('/createbasket',getCreateBasket);
router.get('/editbasket/:id',getEditBasket);
router.post('/delete/:id',deleteCommunity);
router.get('/login',login);
router.get('/logout',logout);



// router.get('/communities',getCommunities);

module.exports = {
    routes: router
}