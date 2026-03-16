// Routes/platform.js
const express=require('express');
const router=express.Router();
const isAuth=require('../Utils/is-auth');
const platformController=require('../Controllers/platforms');

// Public pages rendered via EJS
router.get('/home', platformController.getHome);
router.get('/learn', platformController.getLearn);
router.get('/resources', platformController.getResources);
router.get('/quiz', platformController.getQuiz);

// Authenticated page
router.get('/profile', isAuth, platformController.getProfile);

module.exports=router;