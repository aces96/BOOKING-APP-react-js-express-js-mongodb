const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim: true
    }
    
})

const Roomtype = mongoose.model('roomtype', typeSchema);



// typeSchema.virtual('types',{
//     ref:'types',
//     localField:'_id',
//     foreignField:'room'
// })

module.exports = Roomtype;