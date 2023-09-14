const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const StoreSchema = new mongoose.Schema({
  storeId: {
    type: Number,
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
      type: [Number], //[longitude, lattitide]
      index: "2dsphere",
    },

    formattedAddress: String,
    // added few more items
    city: String,
    stateCode: String,
    zipcode: String,
    streetName: String,
    countryCode: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// GeoCode & create location middleware
StoreSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],

    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    stateCode: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    streetName: loc[0].streetName,
    countryCode: loc[0].countryCode,
  };

  // Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Store", StoreSchema);
