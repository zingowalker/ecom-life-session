import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["true", "Please provide a product name"],
    trim: true,
    maxLength: [120, "Product name should not be max than 120 chars"],
  },
  price: {
    type: Number,
    required: ["true", "Please provide a product price"],
    maxLength: [5, "Product price should not be max than 5 digit"],
  },
  description: {
    type: String,
  },
  photos: [
    {
      secure_url: {
        type: String,
        required: true,
      }
    }
  ],
  stock: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  collectionId: {
    ref: "Collection"
  }
}, { timestamps: true })

export default mongoose.model("Product", productSchema)