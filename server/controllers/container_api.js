const express = require('express');
const router = express.Router();
const randomize = require('randomatic');
const ContModal = require('../modals/container_schema');
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
        const containers = await ContModal.find();
        res.status(200).json(containers);
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
