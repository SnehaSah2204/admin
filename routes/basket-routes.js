const express = require('express');
const {
    addBasket,
    getAllBaskets,
    getBasket,
    updateBasket,
    deleteBasket
} = require('../controllers/basketController');

const router = express.Router();

router.post('/basket', addBasket);
router.get('/baskets', getAllBaskets);
router.get('/basket/:id', getBasket);
router.post('/basket/:id', updateBasket);
router.get('/basket/delete/:id', deleteBasket);


module.exports = {
    routes: router
}