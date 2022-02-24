const express = require('express');

const router = express.Router();

const hotelcontroller = require('../controllers/hotel.controller');

const authController = require('../controllers/auth.controller');
   
router.get('/', authController.protect, authController.restrictTo('admin', 'owner'), hotelcontroller.getHotel);

router.post('/hotel', hotelcontroller.postHotel);

// router.post('/update/:id', hotelcontroller.uploadHotelImages, hotelcontroller.resizeHotelImages, hotelcontroller.EditHotel);
router.get('/get/hotel/:id', hotelcontroller.findOneHotel);

router.put('/edit/:id', hotelcontroller.EditHotel);

router.delete('/delete/:id', hotelcontroller.deleteHotel);

module.exports = router;