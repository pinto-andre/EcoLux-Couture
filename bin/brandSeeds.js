const mongoose = require('mongoose');
const Brands = require('../models/Brand.model')

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://andrepinto:YGa6d8RLPU3BTk7F@cluster0.u1ktoop.mongodb.net/ecolux"

const brand = [
    {
      image: '/images/gucci.jpg',
      title: 'Gucci' ,
      ecoRating: '5.76',
      description: 'Gucci is a renowned luxury fashion brand known for its exquisite craftsmanship, innovative designs, and iconic double-G logo, symbolizing a blend of modernity and heritage. In recent years, Gucci has taken significant ecological strides by committing to sustainability initiatives such as carbon neutrality, ethical sourcing of materials, and reducing its environmental footprint in the fashion industry.',
      link: 'https://www.gucci.com/pt/en_gb/st/about-gucci',
      clothes: [],
    },
      {
      image: '/images/burberry.jpg',
      title: 'Burberry' ,
      ecoRating: '5.63',
      description: 'Burberry stands as a prestigious luxury brand celebrated for its iconic trench coats, synonymous plaid motif, and enduring British refinement. With a strong commitment to environmental progress, Burberry has forged ecological pathways by championing sustainable material procurement, curbing carbon emissions, and advocating circular fashion principles, exemplifying a dedicated stride towards a greener fashion landscape.',
      link: 'https://row.burberry.com/c/our-history/',
      clothes: [],
    },
      {
      image: '/images/balenciaga.jpg',
      title: 'Balenciaga',
      ecoRating: '5.76',
      description: 'Balenciaga is a visionary high-fashion label renowned for its avant-garde designs, architectural silhouettes, and boundary-pushing aesthetics. Amidst its innovative approach to fashion, Balenciaga has demonstrated ecological mindfulness through initiatives such as sustainable material sourcing, minimizing its carbon impact, and fostering a heightened awareness of environmental stewardship within the industry.',
      link: 'https://www.kering.com/en/houses/couture-and-leather-goods/balenciaga/',
      clothes: [],
    },
      {
      image: '/images/bottegaVeneta.jpg',
      title: 'Bottega Veneta',
      ecoRating:'5.76',
      description: 'Bottega Veneta stands as a distinguished luxury brand celebrated for its exceptional craftsmanship, understated elegance, and commitment to artisanal techniques. Within its realm of sophistication, Bottega Veneta has demonstrated ecological consciousness by prioritizing sustainable material origins, implementing carbon-reducing measures, and fostering a heightened sense of environmental responsibility, showcasing a dedicated stride toward a more sustainable future in fashion.',
      link: 'https://www.kering.com/en/houses/couture-and-leather-goods/bottega-veneta/',
      clothes: [],
    },
];

  async function insertBrand() {
    try {
      // establishing the connection with our DB
      let db = await mongoose.connect(MONGO_URI);
  
      // Feedback regarding our connection
      console.log('Database is now connected');
  
      // Create Brands in our database with the seeds array
      let brandCreated = await Brands.create(brand);
  
      // Feedback about Brands creation
      console.log(`Created ${brandCreated.length} brands!`);
  
      // Close the connection
      db.disconnect();
    } catch (error) {
      console.log('An error occurred while connecting to DB', error);
    }
  }
  insertBrand();
