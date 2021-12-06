//--------NFT.CONTROLLERS-------
const Nft = require("./../models/Nft");
const User = require("./../models/User");
const mongoose = require("mongoose");

//-----------------------VIEW ALL NFTs-------------------
exports.getAllNfts = async (req, res) => {
  const allNfts = await Nft.find({});
  res.render("nfts/list", {
    data: allNfts,
  });
};

//-----------------------VIEW MY NFTs-------------------
exports.getMyNfts = async (req, res) => {
  const userID = req.session.currentUser._id;
  //console.log(req.session.currentUser._id);
  const foundUser = await User.findById(userID).populate("nft");
  console.log("Get My NFT:", foundUser);
  res.render("nfts/my-nfts", {
    data: foundUser,
  });
};

//-------------------Add a new NFT-------------------
//-------------------VIEW FORM TO CREATE NFTs-------------------
exports.viewCreateNft = async (req, res) => {
  //llamar al currentUser en view session

  const userID = req.session.currentUser._id;
  //console.log(req.session.currentUser._id);
  const foundUser = await User.findById(userID);
  //console.log(foundUser);
  res.render(`nfts/create`, {
    data: foundUser,
  });
};

//-------------------FORM FOR CREATE NFTs-------------------
exports.createNft = async (req, res) => {
  try {
    console.log("Adentro: ", req.body);
    const nftUsername = req.body.nftUsername;
    const nftTitle = req.body.nftTitle;
    const nftPrice = req.body.nftPrice;
    const nftImage = req.body.nftImage;
    const shortDescription = req.body.shortDescription;
    const nftHashTag = req.body.nftHashTag;
    const userID = req.session.currentUser._id;
    const foundUser = await User.findById(userID);
    //Validations
    if (
      !nftUsername ||
      !nftTitle ||
      !nftImage ||
      !nftPrice ||
      !shortDescription ||
      !nftHashTag
    ) {
      return res.render(`nfts/create`, {
        msg: "All fields are required 🚨",
        data: foundUser,
      });
    }

    //console.log(nftUsername);
    const newNftCreated = new Nft({
      nftUsername,
      nftTitle,
      nftPrice,
      nftImage,
      shortDescription,
      nftHashTag,
    });

    await newNftCreated.save();
    // when the new post is created, the user needs to be found and its posts updated with the
    // ID of newly created post
    await User.findByIdAndUpdate(nftUsername, {
      $push: { nft: newNftCreated._id },
    });
    const data2 = await Nft.find({ nftUsername }).populate("nftUsername");
    res.redirect("/nfts/my-nfts"); // if everything is fine, redirect to list of posts
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};
//-------------------Update NFT-------------------
//-------------------VIEW FORM TO Update NFTs-------------------

exports.viewEditNft = async (req, res) => {
  //console.log(req.params);
  const nftID = req.params.nftID;
  const userID = req.params.userID;
  const foundNft = await Nft.findById(nftID);
  const foundUser = await User.findById(userID);
  res.render("nfts/update", {
    //HBS VISTA
    data: foundNft,
    data2: foundUser,
  });
};

//-------------------FORM TO Update NFTs-------------------
exports.editNft = async (req, res) => {
  // 1. EL ID DEL NFT
  const nftID = req.params.nftID;
  const userID = req.params.userID;
  const foundNft = await Nft.findById(nftID);
  //-----------------START DE VALIDACION---------------
  // 2. LOS NUEVOS CAMBIOS DEL FORMULARIO
  const nftUsername = req.body.nftUsername;
  const nftTitle = req.body.nftTitle;
  const nftImage = req.body.nftImage;
  const nftPrice = req.body.nftPrice;
  const shortDescription = req.body.shortDescription;
  const nftHashTag = req.body.nftHashTag;

  console.log(req.body);

  //Validations
  if (
    !nftUsername ||
    !nftTitle ||
    !nftImage ||
    !nftPrice ||
    !shortDescription ||
    !nftHashTag
  ) {
    return res.render(`nfts/update`, {
      msg: "Te falto algo 🚨 ",
      data: foundNft,
    });
  }

  //---------------END DE VALIDACION-------------------
  // console.log(nftID);
  // console.log(nftTitle, nftImage, nftPrice, nftHashTag, shortDescription);

  // 3. REALIZAR LA ACTUALIZACIÓN DE DATOS EN LA BASE DE DATOS
  // findByIdAndUpdate([ID], [NUEVOS CAMBIOS EN OBJETO], [DEVOLVER A LA VARIABLE LA ACTUALIZACIÓN])
  const updatedNft = await Nft.findByIdAndUpdate(
    nftID, // ID DEL DOCUMENTO
    {
      nftUsername,
      nftTitle,
      nftImage,
      nftPrice,
      shortDescription,
      nftHashTag,
    },
    { new: true } // DEVOLVER A LA VARIABLE EL DOCUMENTO ACTUALIZADO
  );

  console.log(updatedNft);
  res.redirect(`/nfts/my-nfts`);
};

//-----------------------FORM TO DELETE NFTs-----------------------
exports.deleteNft = async (req, res) => {
  // 1. IDENTIFICAR EL DRONEQUE QUIERO BORRAR
  const nftID = req.params.nftID;

  // 2. REALIZAMOS BORRADO EN BASE DE DATOS
  const deletedNft = await Nft.findByIdAndDelete(nftID);

  console.log("Borrado de drone:", deletedNft);

  // 3. REDIRECCIÓN
  res.redirect("/nfts");
};
//-----------------------VIEW TO BUY NFTs-----------------------
exports.viewBuyNft = async (req, res) => {
  const nftID = req.params.nftID;
  const foundNft = await Nft.findById(nftID);
  console.log("nft:", foundNft);
  res.render("nfts/buy", {
    dataBuy: foundNft,
  });
};
