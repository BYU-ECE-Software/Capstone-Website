const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// POST /purchases
router.post("/", orderController.submitPurchaseRequest);

// GET /purchases
router.get("/", orderController.getAllOrders);

module.exports = router;
