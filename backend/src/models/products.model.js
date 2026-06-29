import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number, // Used to show the crossed-out markdown price (e.g., Rs. 2,000)
    },
    photo: {
      type: String, // URL of the boutique product image
      required: true,
    },
    category: {
      type: String, // "Dresses", "Tops", "Pants", "Skirts", "Accessories"
      required: true,
      index: true,  // Speeds up your frontend navigation filter queries
    },
    ratings: {
      type: Number,
      default: 4.0, // Default fallback rating as seen on your UI cards
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0, // Number of reviews showing in parentheses next to the star
    },
  },
  { 
    timestamps: true // Fixed casing from 'timeStamps' to 'timestamps'
  },
);

const productModel = mongoose.model("product", productSchema);
export default productModel;