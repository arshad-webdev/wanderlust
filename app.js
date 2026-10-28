const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
require("dotenv").config();

main()
  .then((res) => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const app = express();

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port : ${process.env.PORT}`);
});
