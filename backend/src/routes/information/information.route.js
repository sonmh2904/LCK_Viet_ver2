const express = require("express");
const router = express.Router();
const informationController = require("../../controller/information/information.controller");

// GET /api/v1/information - Get all information
router.get("/", informationController.getAllInformation);

// GET /api/v1/information/:id - Get information by ID
router.get("/:id", informationController.getDetail);

// POST /api/v1/information - Add new information
router.post("/", informationController.addInformation);

// PUT /api/v1/information/:id - Update information status
router.put("/:id", informationController.updateInformation);

module.exports = router;