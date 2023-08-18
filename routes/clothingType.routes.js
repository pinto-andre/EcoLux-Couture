const express = require("express");
const router = express.Router();

const Brand = require("../models/Brand.model");
const ClothingType = require("../models/ClothingType.model");
const User = require('../models/User.model');
const cloudinary = require('cloudinary')
const uploader = require("../config/uploader.config");

/* GET clothing type list */
router.get("/clothing", async (req, res) => {
  try {
    const user = req.session.currentUser;
  let putLayout = '';
  if (user) {
    putLayout = 'login-layout.hbs';
  } else {
    putLayout = 'layout.hbs';
  }
  let renderPage = '';
    if (user) {
      renderPage = 'clothing/clothing-list-login.hbs';
    } else {
      renderPage = 'clothing/clothing-list.hbs';
    }
    let allClothing = await ClothingType.find();
    res.render(renderPage, { clothing: allClothing, layout: putLayout });
  } catch (error) {
    console.log(error);
  }
});

/* GET clothing type list for men */
router.get("/clothing/men", async (req, res) => {
  let menClothes = [];
  try {
    const user = req.session.currentUser;
    let putLayout = '';
    if (user) {
      putLayout = 'login-layout.hbs';
    } else {
      putLayout = 'layout.hbs';
    }

    let renderPage = '';
    if (user) {
      renderPage = 'clothing/clothing-list-men.hbs';
    } else {
      renderPage = 'no-member.hbs';
    }

    let allClothing = await ClothingType.find();
    allClothing.forEach((element) => {
      if (element.gender === "Men") {
        menClothes.push(element);
      }
    });

    /* console.log("all", allClothing);
    console.log(menClothes); */
    res.render( renderPage, { menClothes, layout: putLayout });
  } catch (error) {
    console.log(error);
  }
});

/* GET clothing type list for women */
router.get("/clothing/women", async (req, res) => {
    let womenClothes = [];
    try {
      const user = req.session.currentUser;
      let putLayout = '';
      if (user) {
        putLayout = 'login-layout.hbs';
      } else {
        putLayout = 'layout.hbs';
      }

      let renderPage = '';
      if (user) {
        renderPage = 'clothing/clothing-list-women.hbs';
      } else {
        renderPage = 'no-member.hbs';
      }


      let allClothing = await ClothingType.find();
      allClothing.forEach((element) => {
        if (element.gender ==="Women") {
            womenClothes.push(element);
        }
      });

      res.render(renderPage, { womenClothes, layout: putLayout });
    } catch (error) {
      console.log(error);
    }
  });

/* Create routes */
 //Get route to display create form
router.get("/clothing/create", (req, res) => {
  const user = req.session.currentUser;
  let putLayout = '';
  if (user) {
    putLayout = 'login-layout.hbs';
  } else {
    putLayout = 'layout.hbs';
  }
  res.render("clothing/new-clothing.hbs", {layout: putLayout});
});
//Pos route to retrieve user filled info for creation
router.post("/clothing/create", uploader.single('image'), async (req, res) => {
  try {
    console.log("req.body:", req.body);
   

    if (!req.file) {
      throw new Error("Image file not uploaded");
    }

    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
    console.log("cloudinaryResult:", cloudinaryResult);

    const imageUrl = cloudinaryResult.secure_url;

    await ClothingType.create({
      image: imageUrl,
      name: req.body.name,
      brand: req.body.brand,
      sizes: req.body.sizes,
      type: req.body.type,
      gender: req.body.gender,
      description: req.body.description,
    });

    res.redirect("/clothing");
  } catch (error) {
    console.log("Error:", error);
    res.render("clothing/new-clothing.hbs");
  }
});



/* Details route */
router.get("/clothing/:clothingId", async (req, res) => {
  try{
    const user = req.session.currentUser;
    const {clothingId} = req.params;
    let isFav;
    const thisUser = await User.findById(user._id)
    if(thisUser.favouriteClothing.includes(`${clothingId}`)){
        isFav = true;
    }
    let chosenClothing = await ClothingType.findById(clothingId);
    let putLayout = '';
  if (user) {
    putLayout = 'login-layout.hbs';
  } else {
    putLayout = 'layout.hbs';
  }
    res.render('clothing/clothing-description', {chosenClothing, layout: putLayout})

  }
  catch(error){
      console.log(error);
  }
})

/** MY FAVOURITE CLOTHING **/

// Display favourites
router.get("/myFavouriteClothing", async (req, res) => {
  try {
    // Get info user
    let user = req.session.currentUser;
    // Get reviews to cards
    user = await User.findById(user._id).populate("favouriteClothing");

    res.render("favourite-clothing.hbs", {
      favourites: user.favouriteClothing,
      layout: "login-layout.hbs",
    });
  } catch (error) {
    console.log(error);
  }
});

// Add clothing to favourites
router.post("/favourite/add/:clothingId", async (req, res) => {
  try {
    const { clothingId } = req.params;

    const user = req.session.currentUser;

    await User.findByIdAndUpdate(user._id, {
      $push: { favouriteClothing: clothingId },
    });

    res.redirect(`/clothing/${clothingId}`);
  } catch (error) {
    console.log(error);
  }
});


// Remove brand from brands(favourites)
router.post("/favourite/remove/:clothingId", async (req, res) => {
  try {
    const { clothingId } = req.params;

    const user = req.session.currentUser;

    await User.findByIdAndUpdate(user._id, {
      $pull: { favouriteClothing: clothingId },
    });

    res.redirect(`/clothing/${clothingId}`);
  } catch (error) {
    console.log(error);
  }
});

//Remove brand from myFavouriteBrand
router.post("/favourite/removeFromFav/:clothingId", async (req, res) => {
  try {
    const { clothingId } = req.params;

    const user = req.session.currentUser;

    await User.findByIdAndUpdate(user._id, {
      $pull: { favouriteClothing: clothingId },
    });

    res.redirect("/myFavouriteClothing");
  } catch (error) {
    console.log(error);
  }
});

/* Clothing updating route */
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
    await ClothingType.findByIdAndUpdate(clothingId,{ name, brand, sizes, type, gender, description }, { new: true }
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
