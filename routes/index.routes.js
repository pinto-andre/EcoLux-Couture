const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET about page */
router.get("/about", (req, res, next) => {
  res.render("about");
});

/* GET about page */
router.get("/contact", (req, res, next) => {
  res.render("contact");
});






/* User profile route */
module.exports = router;
