const express = require('express');
const router = express.Router();

const cloudinary = require('cloudinary')

const Brand = require("../models/Brand.model");
const ClothingType = require("../models/ClothingType.model");
const User = require('../models/User.model');
const uploader = require("../config/uploader.config");


/* GET brands list */
router.get("/brands", async (req, res) => {
    try{
      const user = req.session.currentUser;
      let putLayout = '';
      if (user) {
        putLayout = 'login-layout.hbs';
      } else {
        putLayout = 'layout.hbs';
      }

      let renderPage = '';
      if (user) {
        renderPage = 'brands/brand-list.hbs';
      } else {
        renderPage = 'brands/brand-list-logout.hbs';
      }
       let allBrands = await Brand.find();


    res.render(renderPage, {userInSession: req.session.currentUser, brand: allBrands, layout: putLayout}); 
    }
    catch(error){console.log(error)}
});

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


/* Create routes */
//Get route to display create form
router.get('/brands/create', (req,res) => {
    res.render('brands/new-brand.hbs')
})
//Pos route to retrieve user filled info for creation
router.post('/brands/create', uploader.single('image'), async (req,res)=>{
    try{
        const { title, ecoRating, description, link, clothes} = req.body;
        const { path: image } = req.file;
        await Brand.create({image, title, ecoRating, description, link, clothes})
        res.redirect('/brands');
    }
    catch(error){
        console.log(error)
        res.render('brands/new-brand.hbs')
    }
})

/* brand details route */
router.get('/brands/:brandId', async (req, res) => {
    try{
      const user = req.session.currentUser;
      const {brandId} = req.params;
      let isFav;
      const thisUser = await User.findById(user._id)
      if(thisUser.favouriteBrand.includes(`${brandId}`)){
          isFav = true;
      }
      let chosenBrand = await Brand.findById(brandId);
      
      res.render('brands/brand-description', {chosenBrand})

    }
    catch(error){
        console.log(error);
    }
})


/** MY FAVOURITE BRAND **/

// Display favourites
router.get("/myFavouriteBrands", async (req, res) => {
    try {
      // Get info user
      let user = req.session.currentUser;
      // Get reviews to cards
      user = await User.findById(user._id).populate("favouriteBrand");
  
      res.render("favourite-brands.hbs", {
        favourites: user.favouriteBrand,
        layout: "login-layout.hbs",
      });
    } catch (error) {
      console.log(error);
    }
  });
  
  // Add brand to favourites
  router.post("/favourite/add/:brandId", async (req, res) => {
    try {
      const { brandId } = req.params;
  
      const user = req.session.currentUser;
  
      await User.findByIdAndUpdate(user._id, {
        $push: { favouriteBrand: brandId },
      });
  
      res.redirect(`/brands/${brandId}`);
    } catch (error) {
      console.log(error);
    }
  });
  

  // Remove brand from brands(favourites)
  router.post("/favourite/remove/:brandId", async (req, res) => {
    try {
      const { brandId } = req.params;
  
      const user = req.session.currentUser;
  
      await User.findByIdAndUpdate(user._id, {
        $pull: { favouriteBrand: brandId },
      });
  
      res.redirect(`/brands/${brandId}`);
    } catch (error) {
      console.log(error);
    }
  });
  
  //Remove brand from myFavouriteBrand
  router.post("/favourite/removeFromFav/:brandId", async (req, res) => {
    try {
      const { brandId } = req.params;
  
      const user = req.session.currentUser;
  
      await User.findByIdAndUpdate(user._id, {
        $pull: { favouriteBrand: brandId },
      });
  
      res.redirect("/myFavouriteBrands");
    } catch (error) {
      console.log(error);
    }
  });




/* Brand updating route */
//Get route to display editing form
router.get('/brands/:brandId/edit', async (req, res) => {
    try{
        const {brandId} = req.params;
        let chosenBrand = await Brand.findById(brandId)
        let allBrands = await Brand.find()
        res.render('brands/brand-edit', {brand: chosenBrand, brands: allBrands})
    }
    catch(error){
        console.log(error);
    }
})
//Post route to retrieve user filled info for updating
router.post('/brands/:brandId/edit', async (req, res) => {
    try{
        const {brandId} = req.params;
        const {title, ecoRating, description, link} = req.body;
        await Brand.findByIdAndUpdate(brandId, {title, ecoRating, description, link}, {new: true});
        res.redirect(`/brands/${brandId}`);
    }
    catch(error){
    }
})

/* Delete route */
router.post('/brands/:brandId/delete', async (req, res)=>{
    try{
        const {brandId}= req.params
        await Brand.findByIdAndRemove(brandId)
        res.redirect('/brands')
    }
    catch(error){
        console.log(error)
    }
})


module.exports = router;
