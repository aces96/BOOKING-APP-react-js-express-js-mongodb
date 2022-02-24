const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv').config();
const globalErrorHandling = require('./controllers/err.controller');
const AppError = require('./helpers/appError');
const userRoute = require('./routes/user.route');
const hotelRoute = require('./routes/hotel.route');
const roomRouter = require('./routes/room.route');
const bookingRouter = require('./routes/booking.route');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api', roomRouter);
app.use('/api', bookingRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find any ${req.originalUrl} on this server !`, 404));
});

// app.use('/api/room', roomRouter);

app.use(globalErrorHandling);

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => `Server is running on port ${PORT}`);
    console.log('Connection Successed !!');
    console.log(`Server is running on port ${PORT}`);
}).catch(err => {
    console.log(err);
});
