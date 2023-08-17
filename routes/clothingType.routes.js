const express = require("express");
const router = express.Router();

const Brand = require("../models/Brand.model");
const ClothingType = require("../models/ClothingType.model");

/* GET clothing type list */
router.get("/clothing", async (req, res) => {
  try {
    let allClothing = await ClothingType.find();
    res.render("clothing/clothing-list", { clothing: allClothing });
  } catch (error) {
    console.log(error);
  }
});

/* GET clothing type list for men */
router.get("/clothing/men", async (req, res) => {
  let menClothes = [];
  try {
    let allClothing = await ClothingType.find();
    allClothing.forEach((element) => {
      if (element.gender ==="Men") {
        menClothes.push(element);
      }
    });

    /* console.log("all", allClothing);
    console.log(menClothes); */
    res.render("clothing/clothing-list-men", { menClothes });
  } catch (error) {
    console.log(error);
  }
});

/* GET clothing type list for women */
router.get("/clothing/women", async (req, res) => {
    let womenClothes = [];
    try {
      let allClothing = await ClothingType.find();
      allClothing.forEach((element) => {
        if (element.gender ==="Women") {
            womenClothes.push(element);
        }
      });
  
      /* console.log("all", allClothing);
      console.log(menClothes); */
      res.render("clothing/clothing-list-women", { womenClothes });
    } catch (error) {
      console.log(error);
    }
  });

/* Create routes */
//Get route to display create form
router.get("/clothing/create", (req, res) => {
  res.render("clothing/new-clothing.hbs");
});
//Pos route to retrieve user filled info for creation
router.post("/clothing/create", async (req, res) => {
  try {
    const { image, name, brand, sizes, type, gender, description } = req.body;
    await ClothingType.create({
      image,
      name,
      brand,
      sizes,
      type,
      gender,
      description,
    });

    res.redirect("/clothing");
  } catch (error) {
    console.log(error);
    res.render("clothing/new-clothing.hbs");
  }
});

/* Details route */
router.get("/clothing/:clothingId", async (req, res) => {
  try {
    const { clothingId } = req.params;
    let chosenClothing = await ClothingType.findById(clothingId);
    res.render("clothing/clothing-description", { chosenClothing });
  } catch (error) {
    console.log(error);
  }
});

/* Brand updating route */
//Get route to display editing form
router.get("/clothing/:clothingId/edit", async (req, res) => {
  try {
    const { clothingId } = req.params;
    let chosenClothing = await ClothingType.findById(clothingId);
    let allClothing = await ClothingType.find();
    res.render("clothing/clothing-edit", {
      chosenClothing,
      clothing: allClothing,
    });
  } catch (error) {
    console.log(error);
  }
});
//Post route to retrieve user filled info for updating
router.post("/clothing/:clothingId/edit", async (req, res) => {
  try {
    const { clothingId } = req.params;
    const { name, brand, sizes, type, gender, description } = req.body;
    await ClothingType.findByIdAndUpdate(
      clothingId,
      { name, brand, sizes, type, gender, description },
      { new: true }
    );
    res.redirect(`/clothing/${clothingId}`);
  } catch (error) {}
});

/* Delete route */
router.post("/clothing/:clothingId/delete", async (req, res) => {
  try {
    const { clothingId } = req.params;
    await ClothingType.findByIdAndRemove(clothingId);
    res.redirect("/clothing");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
