const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const TransactionDetails = require("../modals/Transaction_details");
const { toASCII } = require('punycode');

require("dotenv").config();
router.post("/order", async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
  
      const options = req.body;
      const order = await razorpay.orders.create(options);
  
      if (!order) {
        return res.status(500).send("Error");
      }
  
      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error");
    }
  });


router.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });


  router.post('/sent', async (req, res) => {
    const { user_id, agent_id, cont_id, payment_id, order_id,amount } = req.body;
    try {
        const Transaction = new TransactionDetails({
            user_id: req.body.user_id,
            agent_id: req.body.agent_id,
            cont_id: req.body.cont_id,
            payment_id: req.body.payment_id,
            order_id: req.body.order_id,
            amount : req.body.amount
        });

        await Transaction.save();
        res.status(200).json({ success: true });
    } catch (err) {
        console.error("Error booking cont:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/transactions', async (req, res) => {
  const { user_id } = req.body;
  try {
      const transactions = await TransactionDetails.find({ user_id: req.body.user_id });

      res.status(200).json(transactions);
  } catch (err) {
      console.error("Error fetching transactions:", err);
      res.status(500).json({ error: "Internal Server Error" });
  }

  
});

router.post('/transactionsagent', async (req, res) => {
  const { agent_id} = req.body;
  try {
      const transactions = await TransactionDetails.find({ agent_id: req.body.agent_id });

      res.status(200).json(transactions);
  } catch (err) {
      console.error("Error fetching transactions:", err);
      res.status(500).json({ error: "Internal Server Error" });
  }

  
});




  


  module.exports = router;