const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
require("dotenv").config();
const path = require("path");

main()
  .then((res) => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//listing route
app.get("/", async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

//new route
app.get("/listings/new", async (req, res) => {
  res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const detail = await Listing.findById(id);
  res.render("listings/show.ejs", { detail });
});

//create route
app.post("/listings/new", async (req, res) => {
  const listing = req.body.listing;
  const newlisting = new Listing(listing);
  await newlisting.save();
  res.redirect("/");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
