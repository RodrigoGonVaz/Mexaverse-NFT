//--------NFT.CONTROLLERS-------
const Nft = require("./../models/Nft");
const mongoose = require("mongoose");

const home = async (req, res) => {
  const allNfts = await Nft.find({});
  //console.log(allNfts);
  res.render("home", {
    data: allNfts,
  });
};

module.exports = home;
