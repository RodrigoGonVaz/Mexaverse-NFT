//--------------NFT.ROUTES----------------
//1. IMPORT
const router = require("express").Router();

const {
  getAllNfts,
  getMyNfts,
  viewCreateNft,
  createNft,
  viewEditNft,
  editNft,
  deleteNft,
  viewBuyNft,
} = require("./../controllers/nft.Controller");

const { isLoggedIn } = require("./../middlewares");

//2. Routes
//-------------ALL VIEW NFTs------------
router.get("/", getAllNfts);
//-------------MY VIEW NFTs------------
router.get("/my-nfts", isLoggedIn, getMyNfts);

//-------------Add NFTs------------
router.get("/create", isLoggedIn, viewCreateNft);

router.post("/create", isLoggedIn, createNft);

//-------------Update NFTs-------------
router.get("/:nftID/edit", isLoggedIn, viewEditNft);

router.post("/:nftID/edit", isLoggedIn, editNft);

//-------------Delete NFTs-------------
router.post("/:nftID/delete", isLoggedIn, deleteNft);

//-------------BUY NFTs-------------
router.get("/:nftID/buy", isLoggedIn, viewBuyNft);

//3. EXPORT
module.exports = router;
