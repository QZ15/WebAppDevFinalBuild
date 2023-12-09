const User = require('../models/user.js');
const _ = require('lodash');
const errorHandler = require('./error.controller.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secureSecretKey } = require('../models/secretKeyConfig'); // Adjust the path accordingly

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    // Generate JWT token using the secure secret key
    const token = jwt.sign({ _id: user._id }, secureSecretKey);

    // Send the token in the response
    res.json({
      message: 'Signin successful',
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: 'User not found',
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    user = _.extend(user, req.body); // Use _.extend from lodash
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Finding user");
    // Find the user by email
    const user = await User.findOne({ email });

    const encryptPassword = function(password) {
      return bcrypt.hashSync(password, user.salt); // Use bcrypt to hash the password
    };

    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log("User found");

    // If user found but password doesn't match, return an error
    pw = encryptPassword(password);
    console.log(pw, " ", user.hashed_password);
    if(pw === user.hashed_password){
      console.log("In loop");
      //Generate JWT token
      const token = jwt.sign({ _id: user._id }, secureSecretKey);

      // Send the token in the response
      res.json({
      message: 'Signin successful',
      token,
      });
    }else{
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = { create, userByID, read, list, remove, update, signin };