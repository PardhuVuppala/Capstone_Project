const express = require("express");
const router = express.Router();
const BookModal = require('../modals/Booking_Scheme');
const ContModal = require('../modals/container_schema');
const UserModal = require('../modals/user_schema')


router.post('/register',async(req,res)=>{
    const { user_id, agent_id, cont_id, start_time, end_time } = req.body;
    try{
        const existingBooking = await BookModal.findOne({
            cont_id  :cont_id,
            $or: [
                { start_time: { $lt: end_time }, end_time: { $gt: start_time } }, // Overlapping bookings
                { start_time: { $eq: start_time }, end_time: { $eq: end_time } } // Same time booking
            ]
        })
        if(existingBooking)
        {
            return res.status(400).json({ message: "cont already booked for the given time slot." }); 
        }
        const newBooking = new BookModal({
            user_id: req.body.user_id,
            agent_id: req.body.agent_id,
            cont_id: req.body.cont_id,
            start_time: req.body.start_time,
            end_time: req.body.end_time
        })
        await newBooking.save();
        return res.status(200).json({ message: "cont booked successfully." });

    }
    catch(err)
    {   
        console.error("Error booking cont:", error);
        return res.status(500).json({ message: "Internal server error." });
    } 
});

// router.post('/avaliable', async (req, res) => {
//     const { start_time, end_time } = req.body;

//     try {
//         // Find all containers
//         const allContainers = await ContModal.find();

//         // Initialize an object to store containers with availability status
//         const containersWithAvailability = {};

//         // Loop through each container
//         for (const container of allContainers) {
//             // Check if the container is available for the specified time slot
//             const isAvailable = await isContainerAvailable(container._id, start_time, end_time);

//             // Add container with availability status to the object
//             containersWithAvailability[container._id] = isAvailable;
//         }

//         return res.status(200).json({ message: "Containers availability for the given time slot.", containersWithAvailability });
//     } catch (err) {
//         console.error("Error fetching containers availability:", err);
//         return res.status(500).json({ message: "Internal server error." });
//     }
// });

// // Function to check container availability for a given time slot
// async function isContainerAvailable(containerId, startTime, endTime) {
//     // Find bookings that overlap with the specified time slot for the given container ID
//     const overlappingBookings = await BookModal.find({
//         cont_id: containerId,
//         $or: [
//             { start_time: { $lt: endTime }, end_time: { $gt: startTime } }, // Overlapping bookings
//             { start_time: { $eq: startTime }, end_time: { $eq: endTime } } // Same time booking
//         ]
//     });

//     // If there are overlapping bookings, the container is not available
//     return overlappingBookings.length === 0;
// }

   // filtering the conatiners
// router.post('/available', async (req, res) => {
//     const { start_time, end_time, con_type } = req.body;

//     try {
//         // Build the filter object based on provided parameters
//         const filter = {};

//         // Add type filter if type is provided
//         if (con_type) {
//             con_type= con_type;
//         }

//         // Find containers based on filter
//         const containers = await ContModal.find(con_type);

//         // Initialize an object to store containers with availability status
//         const containersWithAvailability = {};

//         // Loop through each container
//         for (const container of containers) {
//             // If start_time and end_time are provided, check availability
//             let isAvailable = true;
//             if (start_time && end_time) {
//                 // Check if the container is available for the specified time slot
//                 isAvailable = await isContainerAvailable(container._id, start_time, end_time);
//             }

//             // Add container with availability status to the object
//             containersWithAvailability[container._id] = isAvailable;
//         }

//         return res.status(200).json({ message: "Containers availability for the given parameters.", containersWithAvailability });
//     } catch (err) {
//         console.error("Error fetching containers availability:", err);
//         return res.status(500).json({ message: "Internal server error." });
//     }
// });

router.post('/available', async (req, res) => {
    const { start_time, end_time, con_type, con_dimension } = req.body;
    console.log(start_time)

    try {
        // Build the filter object based on provided parameters
        const filter = {};

        // Add type filter if type is provided
        if (con_type) {
            filter.con_type = con_type;
        }

        // Add dimension filter if dimension is provided
        if (con_dimension) {
            filter.con_dimension = con_dimension;
        }

        // Find containers based on filter
        const containers = await ContModal.find(filter);

        // Initialize an object to store containers with availability status
        const containersWithAvailability = {};

        // Loop through each container
        for (const container of containers) {
            // If start_time and end_time are provided, check availability
            let isAvailable = true;
            if (start_time && end_time) {
                // Check if the container is available for the specified time slot
                isAvailable = await isContainerAvailable(container._id, start_time, end_time);
            }

            // Add container with availability status to the object
            containersWithAvailability[container._id] = isAvailable;
        }

        return res.status(200).json({ message: "Containers availability for the given parameters.", containersWithAvailability });
    } catch (err) {
        console.error("Error fetching containers availability:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
});


// Function to check container availability for a given time slot
async function isContainerAvailable(containerId, startTime, endTime) {
    // Find bookings that overlap with the specified time slot for the given container ID
    const overlappingBookings = await BookModal.find({
        cont_id: containerId,
        $or: [
            { start_time: { $lt: endTime }, end_time: { $gt: startTime } }, // Overlapping bookings
            { start_time: { $eq: startTime }, end_time: { $eq: endTime } } // Same time booking
        ]
    });

    // If there are overlapping bookings, the container is not available
    return overlappingBookings.length === 0;
}




// user booked container views

router.post('/user/booked-containers', async (req, res) => {
    try {
        // Extract user ID from the request body
        const { user_id } = req.body;

        // Check if user_id is provided
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // Find all bookings for the specific user including start_time and end_time
        const userBookings = await BookModal.find({ user_id }).select('cont_id start_time end_time');

        // Extract container IDs from the user bookings
        const containerIds = userBookings.map(booking => booking.cont_id);

        // Find containers corresponding to the container IDs
        const containers = await ContModal.find({ _id: { $in: containerIds } });

        // Combine container data with booking data
        const bookedContainers = containers.map(container => {
            const bookingsForContainer = userBookings.filter(booking => booking.cont_id.toString() === container._id.toString());
            return bookingsForContainer.map(booking => ({
                _id: container._id,
                ownerid: container.ownerid,
                owner_name: container.owner_name,
                con_uniqueid: container.con_uniqueid,
                con_type: container.con_type,
                con_dimension: container.con_dimension,
                con_datetime: container.con_datetime,
                bookingId: booking._id,
                start_time: booking.start_time,
                end_time: booking.end_time,
                createdAt: container.createdAt,
                updatedAt: container.updatedAt,
                __v: container.__v
            }));
        }).flat();

        return res.status(200).json({ message: "Containers booked by the user.", containers: bookedContainers });
    } catch (err) {
        console.error("Error fetching booked containers for user:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
});





// Agent Of his Booked Containers 


router.post('/agent/booked-users', async (req, res) => {
    try {
        // Extract agent ID from the request body
        const { agent_id } = req.body;

        // Check if agent_id is provided
        if (!agent_id) {
            return res.status(400).json({ message: "Agent ID is required." });
        }

        // Find all bookings made by the specific agent
        const agentBookings = await BookModal.find({ agent_id });

        // Create an object to store user bookings count
        const userBookingsCount = {};

        // Iterate over agentBookings and count the number of bookings per user
        agentBookings.forEach(booking => {
            if (!userBookingsCount[booking.user_id]) {
                userBookingsCount[booking.user_id] = 1;
            } else {
                userBookingsCount[booking.user_id]++;
            }
        });

        // Find details of users corresponding to the user IDs
        const userIds = Object.keys(userBookingsCount);
        const users = await UserModal.find({ _id: { $in: userIds } });

        // Combine user details with booking count
        const usersWithDetails = users.map(user => {
            const bookingCount = userBookingsCount[user._id] || 0;
            return {
                user_id: user._id,
                name: user.username,
                email: user.useremail,
                mobile: user.usermobile,
                dob: user.userdob,
                gender: user.usergender,
                country: user.usercountry,
                address: user.useraddress,
                registration_datetime: user.userregdatetime,
                booking_count: bookingCount
            };
        });

        return res.status(200).json({ message: "Users who booked containers through the agent.", users: usersWithDetails });
    } catch (err) {
        console.error("Error fetching booked users for agent:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
});


//agent containers

module.exports = router;
