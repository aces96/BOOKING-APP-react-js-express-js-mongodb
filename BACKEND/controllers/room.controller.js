const Schema = require('../models/room.model');
const Type = require('../models/roomType.model')
const multer = require('multer');
const Hotel = require('../models/hotel.model')
const Room = require('../models/room.model')
const jwt = require('jsonwebtoken');


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/image/`)
        },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + "--" + file.originalname)
        console.log(file.originalname)
    }
})

exports.upload = multer({storage: fileStorageEngine});  

exports.resizing = async(req, res, next)=>{
    try{
        const images = req.files.map((file)=>{
         sharp(file.buffer)
        .resize(2000 , 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        console.log(images)
    })} catch (err) {
    console.log(err);
  }
  
  next();
}



exports.AvailableRooms =async (req, res)=>{
    const dataa = []
    const data = await Schema.find()

    dataa.push(data)
    console.log(typeof dataa)
    const filters = req.query;
    const filteredUsers = dataa.filter(user => {
      let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
  
}



exports.filterByDate = async(req, res)=>{
   filters = req.query
   console.log(filters)

//    for (key in filters) {
//     console.log(key, filters[key]);
//     // isValid = isValid && user[key] == filters[key];
//   }

}






    exports.getRoom = async(req, res)=>{
        const rooms = await Schema.find().populate('Types');
        console.log(rooms)
    
        try{
            res.send(rooms)
        }catch(error){
            res.status(400).send(error)
        }
    }
    
    exports.CreateRoom = async(req, res)=>{
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.decode(token, process.env.JWT_SECRET)
        console.log(payload)
        const user = payload.id
        try{
            
            const images = req.files.map((file)=>{
                return file.path
            })
            const roomType = req.body.roomType
            const hotel = req.body.hotel
            const {
                room_quatity,
                description,
                price
                } = req.body
        const room = await Schema.create({
            
                room_quatity,
                description,
                price,
                images,
                roomType,
                user,
                hotel
        }); 
        return res.send(room)
        }catch(err){
            res.send(err);
        }
    }
    
    
    // exports.FindSingleRoom = async(req, res)=>{
    //     try{
    //         const room = await Schema.findById(req.params.id);
    //         await room.populate('type').execPopulate()
    //         console.log(room)
    
    //         res.send({data: room})
    //     }catch(err){
    //         res.status(404).send('room not found ! ')
    //     }
    // }
    
    exports.updateRoom = async(req, res)=>{
        try{
            const room = await Schema.findById(req.params.id);
            Object.assign(room, req.body)
            room.save();
            res.send({data: room})
        }catch(err){
            res.send(err)
        }
    }
    
    exports.delete = async(req, res)=>{
        try{
            const room = await Schema.findById(req.params.id)
            await room.remove()
            res.send({data})
        }catch(err){
            res.send(err)
        }
          
    }

    exports.findRoomTypes = async(req, res) => {
        try{
            const roomTypes = await Type.find({})
            res.send(roomTypes)
        }catch(err){
            console.log(err)
        }
    }

    exports.addRoomTypes = async(req, res)=>{
        try{
            const type = Type.create(req.body);
            res.send(type)
        }catch(err){
            res.send(err)
        }
    }

    exports.sortRoomsDescending = async(req, res)=>{
        try{
            const rooms = await Schema
            .find({})
            .sort({
                price : -1,
            })
            res.send(rooms)
        }catch(error){
            res.status(404).send(error)
        }
    }
    exports.sortRoomsAscending = async(req, res)=>{
        try{
            const rooms = await Schema
            .find({})
            .sort({
                price : 1,
            })
            res.send(rooms)
        }catch(error){
            res.status(404).send(error)
        }
    }
    


    exports.getRoomByStars= async (req,res)=>{
        const stars = req.query.stars
        console.log(req.query.stars)
        try {
            const rooms = await Hotel.find({stars: stars}).select('rooms').populate('rooms')
            res.status(200).send(rooms[0].rooms)
            console.log(rooms[0].rooms)
        } catch (error) {
            console.log(error)
            res.send(error)
            
        }
    }


    exports.getRoomByCity = async (req,res)=>{
        const city = req.query.city

        try {
            const hotel = await Hotel.find({city: city}).populate('room_id')
            let rooms = hotel.room_id
            res.status(200).send(rooms)
        } catch (error) {
            res.status(400).send(error)
            
        }
    }





