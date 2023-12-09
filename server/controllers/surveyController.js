// server/controllers/surveyController.js
const Survey = require('../models/survey');
const _ = require('lodash');
const errorHandler = require('./error.controller.js');
const { SchemaTypes } = require('mongoose');

exports.create = async (req, res) => {
  /*try {
    const { schoolName, onlineClassesRating, inPersonClassesRating, productivityRating } = req.body;
    const newSurvey = await Survey.create({
      schoolName,
      onlineClassesRating,
      inPersonClassesRating,
      productivityRating,
    });
    res.status(201).json(newSurvey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }*/
  try {
    const surveyData = req.body;
    const newSurvey = new Survey(surveyData);
    await newSurvey.save();
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.list = async (req, res) => {
  try {
    let surveys = await Survey.find().select('schoolName onlineClassesRating inPersonClassesRating productivityRating');
    res.json(surveys);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

exports.surveyById = async (req, res, next, id) => { 
	try {
    let survey = await Survey.findOne({id : SchemaTypes.ObjectId})
    if (!survey)
      return res.status('400').json({
        error: "Survey not found"
      })
    req.survey = survey
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve survey"
    })
  }
};

exports.read = (req, res) => {
  return res.json(req.survey)
};

exports.update = async (req, res) => {
  try {
    const { schoolName, onlineClassesRating, inPersonClassesRating, productivityRating } = req.body;
    const updatedSurvey = await Survey.findByIdAndUpdate(
      req.params.id,
      {
        schoolName,
        onlineClassesRating,
        inPersonClassesRating,
        productivityRating,
      },
      { new: true }
    );
    if (!updatedSurvey) {
      return res.status(404).json({ error: 'Survey not found' });
    }
    res.status(200).json(updatedSurvey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.remove = async (req, res) => {
  try {
    let deletedSurvey = await Survey.findByIdAndDelete(req.survey.id);//findByIdAndDelete(req.params._id);
    if (!deletedSurvey) {
      return res.status(404).json({ error: 'Survey not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
