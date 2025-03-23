const express = require("express");
const visaController = require("../controllers/VisaApplicantsController");

const router = express.Router();

router.post("/", visaController.createVisaApplication); // Create
router.get("/", visaController.getAllVisaApplications); // Read all
router.get("/:id", visaController.getVisaApplicationById); // Read one
router.put("/:id", visaController.updateVisaApplication); // Update
router.delete("/:id", visaController.deleteVisaApplication); // Delete

module.exports = router;
