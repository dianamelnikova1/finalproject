const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User, Booking, Tour } = require("./models");
const { ObjectId } = require("mongoose").Types; // Import ObjectId

const app = express();
const port = 3000;

mongoose.connect(
  "mongodb+srv://almasamrenoff:almas_050724@cluster0.siu1ooz.mongodb.net/travelAgency?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Updated submit-booking route to handle form submissions
app.post("/submit-booking", async (req, res) => {
  try {
    // Insert user into the "users" collection
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    const savedUser = await user.save();

    // Insert booking into the "bookings" collection
    const booking = new Booking({
      userId: savedUser._id,
      tourId: req.body.tourId, // Use the correct property from req.body
      people: req.body.people,
      tourDate: req.body.tourDate,
    });
    await booking.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error submitting booking:", error);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
