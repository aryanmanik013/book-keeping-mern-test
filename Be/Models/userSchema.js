const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    profilePicture: {
      type: String,
      default: "https://i.ibb.co/Vc2Yyss/default-profile-picture.png",
    },
    socialMedia: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();

  // const salt = await bcrypt.genSalt(10);
});
const users = new mongoose.model("users", userSchema);
module.exports = users;