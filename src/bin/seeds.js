// Import - SEEDS.JS
const mongoose = require("mongoose");
const User = require("./../models/User");

require("dotenv/config");
// Data

const users = [
  {
    userName: "RodgoN",
    password: "holaMundo1234",
    userShortBio: "Rodriog es un gran Geek del mundo NFT",
    userImage: "https://i.ytimg.com/vi/QNpo-XRXH5g/hqdefault.jpg",
    userEmail: "rodrigogonvaz@hotmail.com",
  },
  {
    userName: "martingiura",
    password: "holaMundo1234",
    userShortBio: "Martin es insaciablemente curioso por la tecnologia ",
    userImage: "https://i.ytimg.com/vi/QNpo-XRXH5g/hqdefault.jpg",
    userEmail: "martin.giura@gmail.com",
  },
];

// Connect to db
mongoose.connect(process.env.MONGODB);

// Populate
const generateUsers = async () => {
  await User.create(users);
  console.log("Data Base Populated");
  mongoose.connection.close();
};

// Invoke
generateUsers();
