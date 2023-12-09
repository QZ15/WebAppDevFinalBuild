// server/routes/surveyRoutes.js
const express = require('express');
const surveyCtrl = require('../controllers/surveyController.js');

const router = express.Router();

// Survey routes
router.post('/api/surveys', surveyCtrl.create);

router.route('/api/surveys')
  .get(surveyCtrl.list);

router.route('/api/surveys/:surveyId')
  .get(surveyCtrl.read)
  .put(surveyCtrl.update)
  .delete(surveyCtrl.remove);

router.param('surveyId', surveyCtrl.surveyById);

module.exports = router;

