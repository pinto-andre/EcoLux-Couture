const express = require('express');
const router = express.Router();

const Brand = require("../models/Brand.model");

/* GET brands list */
router.get("/brands", async (req, res) => {
    try{
       let allBrands = await Brand.find();
    res.render("brands/brand-list", {brand: allBrands}); 
    }
    catch(error){console.log(error)}
});


//Get route to display create form
router.get('/brands/create', (req,res) => {
    res.render('brands/new-brand.hbs')
})

router.post('/brands/create', async (req,res)=>{
    try{
        const {image, title, ecorating, description, clothes} = req.body;
        await Brand.create({image, title, ecorating, description, clothes})
        res.redirect('/brands');
    }
    catch(error){
        console.log(error)
        res.render('brands/new-brand.hbs')
    }
})









module.exports = router;
