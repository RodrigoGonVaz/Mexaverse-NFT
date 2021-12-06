//---------------NFT MODELS---------------
//IMPORT
const { Schema, model } = require("mongoose");

//2.Schema
const nftSchema = new Schema(
  {
    nftTitle: {
      type: String,
      trim: true,
      required: [true, "NFT Title is required 🚨 "],
    },
    nftUsername: {
      type: Schema.Types.ObjectId,
      ref: "User", //<---- one-to-one,
    },
    nftPrice: {
      type: Number,
      required: [true, "Price is required 💸 ."],
    },
    nftImage: {
      type: String,
      required: [true, "NFT is required 🇲🇽 ."],
    },
    shortDescription: {
      type: String,
      required: [true, "Short Description is required 🇲🇽 ."],
    },
    nftHashTag: {
      type: [String],
    },
  },
  { timestamps: true }
);

// Model
const Nft = model("Nft", nftSchema);

// Export
module.exports = Nft;
