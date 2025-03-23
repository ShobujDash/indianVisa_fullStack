const VisaApplication = require("../models/VisaApplicantsModel");

// Create a new Visa Application
exports.createVisaApplication = async function (req, res) {
  try {
    const visaApplication = await VisaApplication.create(req.body);
    res.status(201).json({success:true,message:"Saved Successfully!", visaApplication });
  } catch (err) {
    res.status(400).json({success:fase,message:"Server Error!", error: err.message });
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
