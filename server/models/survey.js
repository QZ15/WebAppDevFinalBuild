// server/models/survey.js

const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  onlineClassesRating: { type: String, required: true },
  inPersonClassesRating: { type: String, required: true },
  productivityRating: { type: Number, required: true },
  // Add other fields as needed
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
