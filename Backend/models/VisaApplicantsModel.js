var mongoose = require("mongoose");

var attendeeSchema = new mongoose.Schema({
  webFileNumber: { type: String, required: true },
  fullName: { type: String, required: true },
});

var visaApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ivac: { type: String, required: true },
    visaType: { type: String, required: true },
    webFileNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    otpPhone: { type: String, required: true },
    ivacPassword: { type: String, required: true },
    purposeOfVisit: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentPhone: { type: String, required: true },
    attendees: [attendeeSchema],
    status: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisaApplication", visaApplicationSchema);
