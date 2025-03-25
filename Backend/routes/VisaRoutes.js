const express = require("express");
const visaController = require("../controllers/VisaApplicantsController");

const router = express.Router();

router.post("/", visaController.createVisaApplication); // Create
router.get("/", visaController.getAllVisaApplications); // Read all
router.get("/:id", visaController.getVisaApplicationById); // Read one
router.put("/:id", visaController.updateVisaApplication); // Update
router.delete("/:id", visaController.deleteVisaApplication); // Delete
router.get("/getUser/:userId", visaController.getVisaApplicationsByUser);

// Fetch applications by status
router.get("/status/:status", visaController.getVisaApplicationsByStatus);

// Update multiple applications' status
router.post(
  "/update-status",
  visaController.updateMultipleVisaApplicationStatus
);

module.exports = router;
