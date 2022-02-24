
const express = require('express');

const router = express.Router();

// const admincontroller = require('../controllers/admin.controller')
const ownerController = require('../controllers/owner.controller');

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

// router.route('/').get();


router.route('/proprietaire')
      .get((req,res)=>{
            let users = new ownerController
            users.getAll(req,res)
      })

      .post(ownerController.upload.single('image'),(req,res)=>{
            let users =  ownerController.create(req,res)
      })
      router.route('/proprietaire/:id')
      .put(ownerController.upload.single('image'),ownerController.updateOwnerProfil)

      .delete((req,res)=>{
            let users = new ownerController
            users.deleteOwner(req,res)
      })

// module.exports = router;

// const usertroller = require('../controllers/client.controller');

// router.route('/');

// router.get('/User/:id', usertroller.findOneUser);

// router.post('/create', usertroller.CreateUser);

// router.post('/update/:id', usertroller.UpdateUser);

// router.post('/delete/:id', usertroller.delete);

module.exports = router;


