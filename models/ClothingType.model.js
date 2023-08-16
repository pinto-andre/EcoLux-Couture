const { Schema, model } = require("mongoose");

const clothingTypeSchema = new Schema(
    {
    image: [String],
    name: {
      type: String,
      required: false,
      trim: true,
    },
    brand: {
      type: String
    },
    sizes: {
      enum: ['S', 'M', 'L']
    },
    type: {
      type: String,
      enum: ['Tops', 'Bottoms']
    },
    gender: {
      type: String,
      enum: ['Women', 'Men']
    },
      description: {
        type: String,
        required: true,
    },
    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`
      timestamps: true,
    }
  );

const ClothingType = model("ClothingType", clothingTypeSchema);

module.exports = ClothingType;