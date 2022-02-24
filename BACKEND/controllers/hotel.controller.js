const Hotel = require("../models/hotel.model");
const multer = require('multer');
// const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {

  if(file.mimetype.startsWith('image')) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }

}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadHotelImages = upload.fields([
  {
    name: 'imageCover',
    maxCount: 1
  },
  {
    name: 'images',
    maxCount: 4
  }
]);

exports.resizeHotelImages = async (req, res, next) => {

  try {
    if(!req.files.imageCover || !req.files.images) return next();

    req.body.imageCover = `hotel-${req.params.id}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/hotels/${req.body.imageCover}`);

    req.body.images = [];

    await Promise.all(req.files.images.map(async(file, index) => {
      const filename = `hotel-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;

      await sharp(file.buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/hotels/${filename}`);

      req.body.images.push(filename);

    }));

  } catch (err) {
    console.log(err);
  }
  
  next();
}

///////////////////////////////////////////////////
//  Create Hotel
///////////////////////////////////////////////////
exports.getHotel = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.send(hotels);
  } catch (error) {
    res.send(error);
  }
};

///////////////////////////////////////////////////
// Insert Hotel To Database
///////////////////////////////////////////////////
exports.postHotel = async (req, res) => {
  const {name,description,stars, imageCover,images,user} = req.body
  try {
    const hotel = await Hotel.create({
      name: name,description: description,stars: stars,imageCover: imageCover,images: images, user: user
    });
    return res.send(hotel);
  } catch (err) {
    res.send(err);
    console.log(err)
  }
};

///////////////////////////////////////////////////
//  Edit Hotel By Id
///////////////////////////////////////////////////
exports.EditHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    Object.assign(hotel, req.body);
    hotel.save();
    return res.send({ message: hotel });
  } catch (error) {
    console.log(error);
  }
};

///////////////////////////////////////////////////
// Find Hotel By Id
///////////////////////////////////////////////////
exports.findOneHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('rooms');
    res.send(hotel);
  } catch (err) {
    res.send(err);
    console.log(err)
  }
};

///////////////////////////////////////////////////
// Delete Hotel By Id
///////////////////////////////////////////////////
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    await hotel.remove();
    res.send();
  } catch (err) {
    res.send(err);
  }
};
