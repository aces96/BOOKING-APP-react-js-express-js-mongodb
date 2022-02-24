const Booking = require('../models/booking.model')
const RoomType = require('../models/roomType.model')
const jwt = require('jsonwebtoken')
const AppError = require('../helpers/appError');
const Room = require('../models/room.model');
const Hotel = require('../models/hotel.model');



exports.getAllBooking = async (req,res)=>{
    try {
        const booking = Booking.find({})
        res.status(200).send(booking)
        
    } catch {
        new AppError('something gone wrong while query booking model Booking.find({})', 400)
        
    }
}

exports.addBooking = async (req,res)=>{
    const {date_to,total_price,paid} = req.body;
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.decode(token,process.env.JWT_SECRET)
    const id = payload.id
    try {
        const booking = await Booking.create({
            date_to,
            total_price,
            paid,
            user_id: id            
        })
        res.status(200).json({
            document: booking
        })
        
    } catch (error) {

        new AppError('something gone wrong while query booking model  Booking.create', 400)

        
    }
    
}


exports.updateBooking = async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const {date_to,total_price,status,paid} = req.body
    const id = req.params.id

    try {
        const verifyToken = await jwt.decode(token,process.env.JWT_SECRET)

        const booking = await Booking.findByIdAndUpdate(id,{
            date_to,
            total_price,
            status,
            paid,
            user_id: verifyToken.id
        })

        res.status(200).send(booking)

        
    } catch (error) {
        new AppError('something gone wrong while query booking model  Booking.findByIdAndUpdate', 400)
        
    }

}


exports.deleteBooking = async (req,res)=>{
    const id = req.params.id
    try {
        const booking = await Booking.findByIdAndRemove(id)

        res.status(200).send(booking)
        
    } catch (error) {
        res.status(400).send(error)

        
    }
    

}