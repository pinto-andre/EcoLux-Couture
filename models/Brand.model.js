const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
    {
    image: {
        type: String
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    ecoRating: {
        type: Number,
        required: false,
      },
    description: {
        type: String,
        required: true,
      },
    clothes: [String]
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );

const Brand = model("Brand", brandSchema);

module.exports = Brand;
