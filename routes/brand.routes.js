const express = require('express');
const router = express.Router();

const Brand = require("../models/Brand.model");
const ClothingType = require("../models/ClothingType.model");


/* GET brands list */
router.get("/brands", async (req, res) => {
    try{
       let allBrands = await Brand.find();
    res.render("brands/brand-list", {brand: allBrands}); 
    }
    catch(error){console.log(error)}
});

/* Create routes */
//Get route to display create form
router.get('/brands/create', (req,res) => {
    res.render('brands/new-brand.hbs')
})
//Pos route to retrieve user filled info for creation
router.post('/brands/create', async (req,res)=>{
    try{
        const {image, title, ecoRating, description, link, clothes} = req.body;
        await Brand.create({image, title, ecoRating, description, link, clothes})
        res.redirect('/brands');
    }
    catch(error){
        console.log(error)
        res.render('brands/new-brand.hbs')
    }
})

/* Details route */
router.get('/brands/:brandId', async (req, res) => {
    try{
        const {brandId} = req.params;
        let chosenBrand = await Brand.findById(brandId)

        await chosenBrand.populate('clothes')

        res.render('brands/brand-description', {chosenBrand})
    }
    catch(error){
        console.log(error);
    }
})


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
        res.redirect('/brands', )
    }
    catch(error){
        console.log(error)
    }
})


module.exports = router;
