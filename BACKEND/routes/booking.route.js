const express = require('express');

const router = express.Router();

const bookingcontroller = require('../controllers/booking.controller');

const authController = require('../controllers/auth.controller');


router.route("/booking")
        .get(authController.protect, authController.restrictTo("owner","user"), bookingcontroller.getAllBooking)
        .post(authController.protect, authController.restrictTo("owner","user"), bookingcontroller.addBooking)

router.route("/booking/:id")
        .put(authController.protect, authController.restrictTo("owner","user"), bookingcontroller.updateBooking)
        .delete(authController.protect, authController.restrictTo("owner","user"), bookingcontroller.deleteBooking)



module.exports = router;