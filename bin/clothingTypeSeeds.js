const mongoose = require('mongoose');
const clothingType = require('../models/ClothingType.model')

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://andrepinto:YGa6d8RLPU3BTk7F@cluster0.u1ktoop.mongodb.net/ecolux"

const clothing = [
    {
    image: ['https://saint-laurent.dam.kering.com/m/68d42cdf83a96383/Large-740962Y7F931000_A.jpg?v=1', 'https://saint-laurent.dam.kering.com/m/33721d8758b7ecfb/Large-740962Y7F931000_Y.jpg?v=1'],
    name: 'Glove Dress in Crepe Jersey',
    brand: 'Yves Saint Laurent',
    sizes: ['S', 'M', 'L'],
    type: 'Dress',
    gender: 'Women',
    description: 'Long Strapless dress made from responsible viscose, featuring a sweetheart necline, a draped bodice with cold-shoulder sleeves and integrated gloves',
    },
    {
    image: ['https://saint-laurent.dam.kering.com/m/537816eaf5ace129/Large-738592Y512W1000_A.jpg?v=2', 'https://saint-laurent.dam.kering.com/m/3addf811ed442d01/Large-738592Y512W1000_B.jpg?v=2'],
    name: 'Double-Breasted Tuxedo Jacket in Grain de Poudre',
    brand: 'Yves Saint Laurent',
    sizes: ['S', 'M', 'L'],
    type: 'Suit',
    gender: 'Men',
    description: 'Double-breasted tuxedo jacket made with with responsible wool with a satin peaked lapel, six-button closure and two jetted pockets',
    }
  ];

  async function insertClothingType() {
    try {
      // establishing the connection with our DB
      let db = await mongoose.connect(MONGO_URI);
  
      // Feedback regarding our connection
      console.log('Database is now connected');
  
      // Create Brands in our database with the seeds array
      for(let i = 0; i < clothing.length; i++){
        await clothingType.create(clothing[i]);
      }
      
  
      // Close the connection
      await mongoose.connection.close();
    } catch (error) {
      console.log('An error occurred while connecting to DB', error);
    }
  }

  insertClothingType();