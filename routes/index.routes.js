const express = require('express');
const router = express.Router();

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET about page */
/* router.get("/about", (req, res, next) => {
  res.render("about");
}); */

router.get('/about', (req, res) => {
  const user = req.session.currentUser;
  let putLayout = '';
  if (user) {
    putLayout = 'login-layout.hbs';
  } else {
    putLayout = 'layout.hbs';
  }
  res.render('about', {
    userInSession: req.session.currentUser,
    layout: putLayout,
  });
});

/* GET contact page */
router.get("/contact", (req, res, next) => {
  res.render("contact");
});

/* GET get involved page */
router.get("/involved", (req, res, next) => {
  res.render("get-involved");
});

/* User profile route */
module.exports = router;
