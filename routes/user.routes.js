const express = require('express');
const router = express.Router();

const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')
const User = require('../models/User.model')


/* User profile route */
router.get('/profile', isLoggedIn, async (req, res) => {
   let user = req.session.currentUser;
    try{
    let profileInfo = await User.findById(user._id)
        .populate('favouriteBrand')
        .populate('favouriteClothing')
        res.render('user-profile',  {user, profileInfo})
    }
    catch(error){console.log(error)}
})

module.exports = router;