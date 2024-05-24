const express = require('express');
const router = express.Router();
const randomize = require('randomatic');
const ContModal = require('../modals/container_schema');
const Booking = require('../modals/Booking_Scheme');
const Container = require('../modals/container_schema'); 


// creating containers
router.post('/register', async (req, res) => {
    try{
        const {ownerid, owner_name , con_type, con_dimension} = req.body;
        const userEmail = req.body.owner_name;
        const userEmailPrefix = userEmail.substring(0, 3).toUpperCase();
        // Generating a unique six-digit number
        const randomNumber = randomize('0', 6);
        // Generating a unique additional digit that is not present in the six-digit number
        let additionalDigit = '0';
        for (let i = 0; i <= 9; i++) {
            if (!randomNumber.includes(i.toString())) {
                additionalDigit = i.toString();
                break;
            }
        }
        // Combining all parts to create the unique container ID
        const conUniqueID = userEmailPrefix + randomNumber + additionalDigit;

        const contobj = new ContModal({
            ownerid: req.body.ownerid,
            owner_name : req.body.owner_name,
            con_uniqueid: conUniqueID,
            con_type: req.body.con_type,
            con_dimension: req.body.con_dimension,
        });

        const insertdocument = await contobj.save();
        // res.status(200).send('Document is insert in MongoDB ' + insertdocument.id);
        res.status(200).send('Container Details Sucessfully Added')
    } catch (err) {
        res.status(500).send({ message: err.message || 'Error in saving document to MongoDB' });
    }
});

// Getting all the containers details avaliable

router.get('/containers', async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        // Fetch all containers
        const containers = await Container.find();

        // Get container IDs
        const containerIds = containers.map(container => container._id.toString());

        // Fetch bookings that fall within the date range
        const bookings = await Booking.find({
            cont_id: { $in: containerIds },
            $or: [
                { start_time: { $lt: tomorrow, $gte: today } },
                { end_time: { $gt: today, $lte: tomorrow } },
                { start_time: { $lte: today }, end_time: { $gte: tomorrow } }
            ]
        });

        // Create a map to mark booked containers
        const bookedContainers = new Set(bookings.map(booking => booking.cont_id));

        // Add availability status to containers
        const containerDetails = containers.map(container => ({
            ...container._doc, // Spread the original container document
            availability: !bookedContainers.has(container._id.toString())
        }));

        res.status(200).json(containerDetails);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error in fetching containers from MongoDB' });
    }
});


router.get('/owner/container', async (req, res) => {
    try {
        const { ownerid } = req.query;
        const containers = await ContModal.find({ ownerid });
        res.json(containers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
