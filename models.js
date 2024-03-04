const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String, // Adding phone field to the User schema
});

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
  people: Number, // Adding people field to the Booking schema
  tourDate: Date, // Adding tourDate field to the Booking schema
});

const tourSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  price: Number,
});

const User = mongoose.model("User", userSchema);
const Booking = mongoose.model("Booking", bookingSchema);
const Tour = mongoose.model("Tour", tourSchema);

module.exports = { User, Booking, Tour };
