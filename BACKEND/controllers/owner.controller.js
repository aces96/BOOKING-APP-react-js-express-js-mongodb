const User = require("../models/user.model")
const jwt = require('jsonwebtoken')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, `uploads/`)
    },
    filename: function (req,file,cb){
        cb(null, file.originalname)
    }

})

const fileFilter = (req,file,cb)=>{

    if(!file.mimetype === 'image.png' || !file.mimetype === 'image.jpg' || !file.mimetype === 'image.jpeg'){
        cb(null,false)
        console.log('please change the image type to a valid one')
    }else {
        cb(null,true)
    }
}


exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000 * 1333
    }
})




    exports.getAll = async (req,res)=>{
        try {
            let users = await User.find({}) 
            
        } catch (error) {
            
            
        }

    }

    exports.create = async (req,res)=>{
        const image = req.file.path
        console.log(req.file.path)
        const {username, email, password,passwordConfirm, role} = req.body
    
        const users = await User.insertMany({
            name: username,
            email,
            password,
            passwordConfirm,
            role,
            image
        },(err,resolve)=>{
            if(err){
                res.status(400).send(err)
                console.log(err)
            }else{
                res.status(200).json(resolve)
            }
        })
    }

    exports.updateOwner = async (req,res)=>{
        let id = req.params.id
        let username = req.body.username
        let email = req.body.email
        let password = req.body.password
        let role = req.body.role 

        const users = await User.updateOne({id: id}, {
            name: username,
            email: email,
            password: password,
            role: role
        },(err,resolve)=>{
            if(err){
                res.status(400).send(err)
            }else {
                res.status(200).json(resolve)
            }
        })
    }

    exports.deleteOwner = async (req,res)=>{
        let id = req.params.id
        let users = await User.findOneAndRemove({id: id},(err,resolve)=>{
            if(err){
                res.status(400).send(err)
            }else{
                res.status(200).json(resolve)
            }
        })
    }


    exports.updateOwnerProfil = async (req,res)=>{
        const image = req.file.path
        const id = req.params.id
        const  {name,email,password,passwordConfirm} = req.body
            try {
                const updateUser = await User.findByIdAndUpdate(id,{
                    name,
                    email,
                    password,
                    passwordConfirm,
                    image
                })
            } catch (error) {
                res.status(400).send(error)
                
            }
    }