// Routes/progress.js
const express = require('express');
const router = express.Router();
const progressController = require('../Controllers/progress');

const isAuth = require('../Utils/is-auth'); 

//router for progress page
router.get('/progress', progressController.getProgressPage);

// Router for audut
router.post('/progress/audit', progressController.postAudit);

// router for goal
router.post('/progress/goal', progressController.postGoal);

//router for tool
router.post('/progress/tool', progressController.postTool);

module.exports = router;