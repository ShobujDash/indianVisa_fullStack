const mongoose  = require("mongoose");
const VisaApplication = require("../models/VisaApplicantsModel");

// Create a new Visa Application
exports.createVisaApplication = async function (req, res) {
  try {
    const visaApplication = await VisaApplication.create(req.body);
    res.status(201).json({success:true,message:"Saved Successfully!", visaApplication });
  } catch (err) {
    res.status(400).json({success:false,message:"Server Error!", error: err.message });
  }
};

// Get all Visa Applications
exports.getAllVisaApplications = async function (req, res) {
  try {
    const applications = await VisaApplication.find({});
    res.status(200).json({success:true, message:"Get Successfully", applications});
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

// Get visa applications by userId
exports.getVisaApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const visaApplications = await VisaApplication.find({ userId });

    if (!visaApplications.length) {
      return res.status(404).json({success:false, message: "No visa applications found" });
    }

    res.status(200).json({success:true,message:"get succefully", visaApplications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single Visa Application by ID
exports.getVisaApplicationById = async function (req, res) {
  try {
    const application = await VisaApplication.findById(req.params.id);
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Visa Application
exports.updateVisaApplication = async function (req, res) {
  try {
    const updatedApplication = await VisaApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedApplication)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json(updatedApplication);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Visa Application
exports.deleteVisaApplication = async function (req, res) {
  try {
    const deletedApplication = await VisaApplication.findByIdAndDelete(
      req.params.id
    );
    if (!deletedApplication)
      return res.status(404).json({ message: "Application not found" });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Get Visa Applications by Status
exports.getVisaApplicationsByStatus = async function (req, res) {
  try {
    const { status } = req.params;
    const applications = await VisaApplication.find({ status });
    res.status(200).json({ success: true, message: "Fetched successfully", applications });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// Update multiple Visa Applications' status

exports.updateMultipleVisaApplicationStatus = async function (req, res) {
  try {
    const { ids, status } = req.body;

    // Validate input
    if (!ids || !Array.isArray(ids) || !status) {
      return res.status(400).json({ success: false, message: "IDs and status are required and must be valid." });
    }

    // Convert IDs to MongoDB ObjectIds
    const objectIds = ids.map((id) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      return new mongoose.Types.ObjectId(id);
    }).filter(Boolean); // Remove invalid ones

    if (objectIds.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid or empty ID list." });
    }

    // Perform the update
    const result = await VisaApplication.updateMany(
      { _id: { $in: objectIds } }, 
      { $set: { status } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: "No matching records found." });
    }

    res.status(200).json({ success: true, message: "Status updated successfully!" });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};