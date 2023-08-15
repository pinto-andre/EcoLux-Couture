const mongoose = require('mongoose');
const Brands = require('../models/Brand.model')

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://andrepinto:YGa6d8RLPU3BTk7F@cluster0.u1ktoop.mongodb.net/ecolux"

const brand = [
  {
    image: 'https://logowik.com/content/uploads/images/529_ysl.jpg',
    title: 'Yves Saint Laurent',
    ecoRating: '5.76',
    description: 'Yves Saint Laurent, the iconic fashion brand, epitomizes timeless luxury and sophistication, showcasing a harmonious blend of artistic creativity and refined craftsmanship in its high-end clothing, accessories, and fragrances. In recent years, Yves Saint Laurent has taken significant strides towards reducing its ecological footprint by implementing sustainable practices and initiatives throughout its production processes, reflecting a growing commitment to environmental responsibility.',
    link: 'https://www.kering.com/en/houses/couture-and-leather-goods/saint-laurent/history/',
    clothes: [],
  }
];

  async function insertBrand() {
    try {
      // establishing the connection with our DB
      let db = await mongoose.connect(MONGO_URI);
  
      // Feedback regarding our connection
      console.log('Database is now connected');
  
      // Create Brands in our database with the seeds array
      let brandCreated = await Brands.create(brand[0]);
  
      // Feedback about Brands creation
      console.log(`Created ${brandCreated.length} brands!`);
  
      // Close the connection
      db.disconnect();
    } catch (error) {
      console.log('An error occurred while connecting to DB', error);
    }
  }
  insertBrand();