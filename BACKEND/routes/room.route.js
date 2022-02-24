const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');
const authController = require('../controllers/auth.controller')


    router.get('/', roomController.getRoom );

    // router.get('/singleRoom/:id', roomController.FindSingleRoom);
    router.get('/room', roomController.getRoomByStars);

    router.post('/Room',authController.protect, authController.restrictTo("owner","admin") ,roomController.upload.array('images', 8),roomController.CreateRoom);

    router.post('/updateRoom/:id',authController.protect, authController.restrictTo("owner","admin") , roomController.updateRoom);

    router.post('/deleteRoom/:id',authController.protect, authController.restrictTo("owner","admin") , roomController.delete);

    router.get('/roomTypes', roomController.findRoomTypes);

    router.get('/filterByDate',roomController.AvailableRooms);

    router.post('/addRoomType', roomController.addRoomTypes);

    router.get('/sortDes', roomController.sortRoomsDescending);
    router.get('/sortDes', roomController.sortRoomsAscending);



    module.exports = router;