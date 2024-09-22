const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
    },
    imageUrl: {
      type: String,
    },
    foods: [
      {
        dishName: {
          type: String,
          required: true,
        },
        dishImage: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    code: {
      type: String,
    },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: String },
      longitude: { type: String },
      longitudeDelta: { type: String },
      address: { type: String },
      title: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
