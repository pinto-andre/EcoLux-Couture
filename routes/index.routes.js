const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const Brand = require("../models/Brand.model");
const ClothingType = require("../models/ClothingType.model");
const User = require('../models/User.model')



/* User profile route */
module.exports = router;
