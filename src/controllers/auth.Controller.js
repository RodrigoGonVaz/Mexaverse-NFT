//-------------AUTH.CONTROLLER----------------
// Import
const bcryptjs = require("bcryptjs");
const User = require("./../models/User");
const mongoose = require("mongoose");

//-----------------SIGNUP---------------------
exports.getSignup = async (req, res) => {
  const userID = req.params.userID;
  const theUser = await User.find(userID);
  res.render("auth/signup", { dbUsers: theUser });
};

//-----------------------------POST-----------------------------
exports.postSignup = async (req, res) => {
  // Get Data from form
  const { userName, userEmail, password, userImage, userShortBio } = req.body;
  //Validations
  if ((!userName, !userEmail, !password, !userImage, !userShortBio)) {
    return res.render("auth/signup", {
      msg: "All fields required.",
    });
  }
  //Regex
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    return res.render("auth/signup", {
      msg: "Please include 6 characters, 1 number, 1 upper-case letter, 1 lowercase",
    });
  }
  // Create user
  try {
    // Encript password
    //Veces del hashinhg
    // const salt = await bcryptjs.genSalt(10)
    const salt = await bcryptjs.genSalt(10);
    //Password encriptado
    const hashed = await bcryptjs.hash(password, salt);
    //Crear Usuario
    const createdUser = await User.create({
      userName,
      userEmail,
      password: hashed,
      userImage,
      userShortBio,
    });

    // Crear una sesion dentro del Signup
    req.session.currentUser = {
      _id: createdUser._id,
      userName: createdUser.userName,
      userEmail: createdUser.userEmail,
      userImage: createdUser.userImage,
      userShortBio: createdUser.userShortBio,
    };
    //Redireccion
    res.redirect(`/user/${createdUser.userName}`);
  } catch (error) {
    //Validar email desde el servidor
    if (error instanceof mongoose.Error.ValidationError) {
      res.render("auth/signup", {
        msg: "Use a valid email",
      });
    } else if (error.code === 11000) {
      res.render("auth/signup", {
        msg: "Email already exist. Try again",
      });
    }
    console.log(error);
  }
};

// Functions Login
exports.getLogin = (req, res) => {
  res.render("auth/login");
};

exports.postLogin = async (req, res) => {
  // Get Data
  const { userEmail, password } = req.body;

  // Find User
  try {
    const findUser = await User.findOne({ userEmail });
    if (!findUser) {
      return res.render("auth/login", {
        msg: "User not Found 🥪 ",
      });
    }
    // Check Password - return boolean
    const checkedPassword = await bcryptjs.compareSync(
      password,
      findUser.password
    );

    if (!checkedPassword) {
      return res.render("auth/login", {
        msg: "Invalid Password 👁️‍🗨️ ",
      });
    }
    req.session.currentUser = {
      _id: findUser._id,
      userName: findUser.userName,
      userEmail: findUser.userEmail,
      userImage: findUser.userImage,
      userShortBio: findUser.userShortBio,
    };
    // Redirect
    res.redirect(`/user/${findUser.userName}`);
  } catch (e) {
    console.log(e);
  }
};

// Function Logout
exports.postLogout = async (req, res) => {
  res.clearCookie("session-token");
  req.session.destroy((err) =>
    err ? console.log(e) : res.redirect("/auth/login")
  );
};
