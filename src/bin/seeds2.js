// Import - SEEDS.JS
const mongoose = require("mongoose");
const Nft = require("../models/Nft");

require("dotenv/config");
// Data

const nfts = [
  {
    nftTitle: "spaceX Taco",
    nftUsername: "RodgoN",
    nftImage:
      "https://lh3.googleusercontent.com/by3aVHbgeNT5ypXRXR2YJA1RlNfoqftOH9spQkf7PjMqxS5_G2cMVg1RD-JE6s_S5isSQR51B2vxaeLXUyjt2avQlR3T_Yqocd3WqA=w600",
    nftPrice: 300,
  },
  {
    nftTitle: "Taco Chems",
    nftUsername: "martingiura",
    nftImage:
      "https://lh3.googleusercontent.com/XDvOmyjD_zJ2y7Q9lRHjhsoIK7oVbrj51Xn4Mz82CAtg5oeNR6ilaPXH3Hg-thvSkL04aj5FqxdbhgCJ4fdP0p6Y1q98Y5QAnZ1Rxg=w499",
    nftPrice: 250,
  },
];

// Connect to db
mongoose.connect("process.env.MONGODB");

// Populate
const generateNfts = async () => {
  await Nft.create(nfts);
  console.log("Data Base Populated with NFTS");
  mongoose.connection.close();
};

// Invoke
generateNfts();
