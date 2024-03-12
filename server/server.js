const express = require('express');
var cors = require('cors')
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())

const my_mongoose = require('./db');
const userApi = require('./controllers/user_controller_api')
const contApi = require('./controllers/container_api');
const ownerAPI = require('./controllers/owner_api');
const BookingContainer = require('./controllers/booking_container');
app.use('/con',contApi);
app.use('/user',userApi);
app.use('/owner',ownerAPI);
app.use('/Booking',BookingContainer)
app.listen(4500, () => console.log('EXPRESS Server Started at Port No: 4500 '));
