const express = require('express');
const router = express.Router();

const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')
const User = require('../models/User.model')
const Brand = require('../models/Brand.model')
const ClothingType = require('../models/ClothingType.model')


/* User profile route */
router.get('/profile/:id', isLoggedIn, async (req, res) => {
    try{
        let foundUser = await User.findById(req.session.currentUser._id);

        res.render('user-profile', {foundUser})
    }
    catch(error){console.log(error)}
})

router.post ("/profile", isLoggedIn, async(req, res)=>{
    const {profileBio,profilePicUrl}= req.body;

    try{
        const userId= req.session.currentUser._id;
        console.log(userId)
        const updateUser= await User.findByIdAndUpdate(userId, {profileBio, profilePicUrl}, {new:true})
        res.redirect("/")
    }
    catch (error){
        console.log(error)
    }
})


module.exports = router;