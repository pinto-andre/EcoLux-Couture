const mongoose = require("mongoose");
const clothingType = require("../models/ClothingType.model");

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://andrepinto:YGa6d8RLPU3BTk7F@cluster0.u1ktoop.mongodb.net/ecolux";

const clothing = [
  {
    image: 
      "https://saint-laurent.dam.kering.com/m/6df0185272d074e7/Large-758262Y372Y4681_A.jpg?v=1",
    
    name: "Cassandre Jeans In Hawaii Blue Denim",
    brand: "Yves Saint Laurent",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Women",
    description:
      "Mid-Rise five-pocket jeans made with organic cotton, featuring a relaxed 					fit and a cassandre charm belt loop.",
  },
  {
    image: 
      "https://saint-laurent.dam.kering.com/m/40ecdaeac70f8497/Large-742847Y1G047060_A.jpg?v=1",
    
    name: "Straight Tuxedo Pants In Silk",
    brand: "Yves Saint Laurent",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Men",
    description: "High-waisted pants with satin stripes on the side and darts.",
  },
  {
    image: 
      "https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1682010003/744821_ZAHEY_9783_001_100_0000_Light-Cotton-linen-wrap-skirt.jpg",
    
    name: "Cotton Linen Wrap Skirt",
    brand: "Gucci",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Women",
    description:
      "Gucci channels a sports-inspired aesthetic across this cotton linen wrap skirt. A contrasting piped trim defines the unique construction, while the distinctive logo feel intensifies across the Interlocking G anchor gold-toned buttons.",
  },
  {
    image: 
      "https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1680285933/743028_XJFJK_9200_001_100_0000_Light-GG-cotton-jersey-gilet.jpg",
    
    name: "GG Cotton Jersey Gilet",
    brand: "Gucci",
    sizes: ["S", "M", "L"],
    type: "Tops",
    gender: "Women",
    description:
      "Season after season, the House develops new designs, always drawing attention to the heritage of craftsmanship. A tonal monogram pattern animates this soft cotton jersey gilet, while Double G gold-toned buttons bring an unexpected twist into the mix.",
  },
  {
    image: 
      "https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1685436434/751788_Z798C_4255_001_100_0000_Light-Fluid-drill-trouser-with-Web-detail.jpg",
    
    name: "Fluid Drill Trouser With Web Detail",
    brand: "Gucci",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Men",
    description: "High-waisted pants with satin stripes on the side and darts.",
  },
  {
    image: 
      "https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1685550736/758085_XKDIQ_9166_001_100_0000_Light-Silk-mohair-sweater.jpg",
    
    name: "Silk Mohair Sweater",
    brand: "Gucci",
    sizes: ["S", "M", "L"],
    type: "Tops",
    gender: "Men",
    description:
      "Casual wear such as sweatshirts and sweatpants take on a pared-down silhouette, complete with sleek boots and large shoulder bags, ideal from the city to the country and back. Crafted from silk mohair, this ivory jumper is completed by an embroidered label.",
  },
  {
    image: 
      "https://assets.burberry.com/is/image/Burberryltd/814D5600-F7CC-4A31-A2A4-1B801BA48DE1?$BBY_V2_SL_1x1$&wid=1876&hei=1876",
    
    name: "Embroidered EKD Harrington Jacket",
    brand: "Burberry",
    sizes: ["S", "M", "L"],
    type: "Tops",
    gender: "Men",
    description:
      "Made in Yorkshire from shower-resistant gabardine and embroidered with our Equestrian Knight Design.",
  },
  {
    image: 
      "https://assets.burberry.com/is/image/Burberryltd/A68F9DFD-0242-4D1F-B15A-1518E4B43F22?$BBY_V2_SL_1x1$&wid=1876&hei=1876",
    
    name: "Waterloo- Trench Coat Heritage",
    brand: "Burberry",
    sizes: ["S", "M", "L"],
    type: "Tops",
    gender: "Women",
    description:
      "Shower-resistant gabardine. Double-breasted button-through closure.",
  },
  {
    image: 
      "https://assets.burberry.com/is/image/Burberryltd/E72A8CE9-F440-4529-9728-D2747599BB07?$BBY_V2_SL_1x1$&wid=1876&hei=1876",
    
    name: "Check Cotton Shirt Dress",
    brand: "Burberry",
    sizes: ["S", "M", "L"],
    type: "Tops",
    gender: "Women",
    description: "Burberry Check. Button closure.",
  },
  {
    image: 
      "https://balenciaga.dam.kering.com/m/3eb2f84b39b83bf/Large-751813TNT391000_G.jpg?v=1",
    
    name: "Women's DIY Skirt In Black",
    brand: "Balenciaga",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Women",
    description:
      "DIY Skirt in black barathea.",
  },
  {
    image: 
      "https://balenciaga.dam.kering.com/m/212c339a8bcefd58/Large-746552TNV436840_G.jpg?v=1",
    
    name: "Women's Camden Pantaleggings In Pink",
    brand: "Balenciaga",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Women",
    description:
      "Camden Pantaleggings FR 36 (US size 2/4 or S) waist in bright pink stretch spandex are from look 44 of Balenciaga's Summer 23 Collection.",
  },
  {
    image: 
      "https://balenciaga.dam.kering.com/m/1a2627e365a78c41/Large-751447TOM044249_G.jpg?v=1",
    
    name: "DIY Shirt Oversized In Light Blue",
    brand: "Balenciaga",
    sizes: ["S", "M", "L"],
    type: "Tops",
    gender: "Men",
    description:
      "DIY Shirt Oversized in blue and light blue crushed striped poplin.",
  },
  {
    image: 
      "https://balenciaga.dam.kering.com/m/7a5851d8c8d8294a/Large-767853TPVF19000_F.jpg?v=1",
    
    name: "Top League Baggy Sweatpants In White",
    brand: "Balenciaga",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Men",
    description:
      "Top League Baggy Sweatpants in white medium fleece.",
  },
  {
    image: 
      "https://bottega-veneta.dam.kering.com/m/b5fadc149b7a30c/Large-741001V2R304419_A.jpg?v=2"
    ,
    name: "Slim Fit Ribbed Viscose Cardigan",
    brand: "Bottega Veneta",
    sizes: ["S", "M", "L"],
    type: "Tops",
    gender: "Women",
    description:
      "Ribbed blended bouclé viscose cardigan.",
  },
  {
    image: 
      "https://bottega-veneta.dam.kering.com/m/7b38793c61bc3149/Large-751180V34M02859_A.jpg?v=1",
    
    name: "Felt Wool Long Skirt",
    brand: "Bottega Veneta",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Women",
    description:
      "Felt wool twill long skirt.",
  },
  {
    image:
      "https://bottega-veneta.dam.kering.com/m/79b53d890ac79667/Large-729820V2JG06233_A.jpg?v=1",
    
    name: "Intrecciato Leather Straight Leg Pants",
    brand: "Bottega Veneta",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Men",
    description:
      "Intrecciato leather pants.",
  },
  {
    image: 
      "https://bottega-veneta.dam.kering.com/m/18daca204b57d145/Large-744304V2BL03022_A.jpg?v=1",
    
    name: "Cotton Shorts",
    brand: "Bottega Veneta",
    sizes: ["S", "M", "L"],
    type: "Bottoms",
    gender: "Men",
    description:
      "Compact cotton shorts.",
  },
];

async function insertClothingType() {
  try {
    // establishing the connection with our DB
    let db = await mongoose.connect(MONGO_URI);

    // Feedback regarding our connection
    console.log("Database is now connected");

    // Create Brands in our database with the seeds array
    let clothingCreated = await clothingType.create(clothing);

    // Feedback about Brands creation
    console.log(`Created ${clothingCreated.length} clothes!`);
    

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.log("An error occurred while connecting to DB", error);
  }
}

insertClothingType();
