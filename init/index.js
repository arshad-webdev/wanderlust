const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const data = require("./data.js");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");

  await Listing.deleteMany({});
  console.log("Old listings deleted");

  await Listing.insertMany(data.data);
  console.log("Data stored successfully");

  await mongoose.connection.close();
}

main().catch(async (err) => {
  console.error("Error initializing database:", err);
  await mongoose.connection.close();
  process.exitCode = 1;
});
