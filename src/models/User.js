//------------------MODEL USERS------------------
//IMPORT
const { Schema, model } = require("mongoose");

//2.Schema
const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, "User name is required 🚨 "],
    },
    userEmail: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Use a valid email 🧬 "],
    },
    password: {
      type: String,
      required: [true, "Password is required 📢 ."],
    },
    userImage: String,
    userShortBio: String,
    nft: [{ type: Schema.Types.ObjectId, ref: "Nft" }], //<--- Tiene el ID de cada NFT que crea / one-to-many/ SchemaType is then a configuration object for an individual property.
  },
  { timestamps: true }
);

// Model
const User = model("User", userSchema);

// Export
module.exports = User;
