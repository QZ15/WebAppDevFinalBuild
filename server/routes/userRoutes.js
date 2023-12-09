const express = require('express');
const userCtrl = require('../controllers/userController.js');

const router = express.Router();

router.route('/api/users/signin')
  .post(userCtrl.signin);

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/api/users/:userId')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

// Middleware to handle userId parameter
router.param('userId', userCtrl.userByID);

module.exports = router;