
const express = require('express');

const router = express.Router();

// const admincontroller = require('../controllers/admin.controller')
const ownerController = require('../controllers/owner.controller');
const clientController = require("../controllers/client.controller")

// router.route('/').get();

// router.get('/dush', admincontroller.getDushPage);
   
// router.get('/create', admincontroller.getCreatePage);

// router.post('/create/user', admincontroller.postCreate);

// router.get('/edit/:id', admincontroller.getEditPage);

// router.post('/update/:id', admincontroller.postEdit);

// router.get('/delete/:id', admincontroller.delete);
// const ownerController = require('../controllers/owner.controller')
const authController = require('../controllers/auth.controller');


router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.route("/user")
      .get(clientController.getUsers)

// router.route('/').get();




// module.exports = router;

// const usertroller = require('../controllers/client.controller');

// router.route('/');

// router.get('/User/:id', usertroller.findOneUser);

// router.post('/create', usertroller.CreateUser);

// router.post('/update/:id', usertroller.UpdateUser);

// router.post('/delete/:id', usertroller.delete);

module.exports = router;


