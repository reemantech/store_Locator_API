const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  storeId: {
    type: String,
    require: [true, "please add a store ID"],
    unique: true,
    trim: true,
    maxLength: [10, "store ID must be less than 10 chars"],
  },
  address: {
    type: String,
    required: [true, "Please add the address"],
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },

    formattedAddress: String,
    // added few more items
    zipCode: String,
    country: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Store", StoreSchema);
