import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String, //Would be uploaded from Cloudinary (url)
      required: true,
    },
    coverImage: {
      type: String, //Would be uploaded from Cloudinary (url)
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

//Encrypt password before saving it to database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);  //encrypt password with 10 rounds/salts
    next();
  }
});

//Check/Compare password with encrypted password already present in database
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

//Generate Access Token
userSchema.methods.generateAccessToken = async function () {
      return jwt.sign(
        {
        //Providing payload(data)
        _id: this._id,
        email: this.email,
        username: this.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
      )
}
//Generate Refresh Token
userSchema.methods.generateRefreshToken =  function () {
      jwt.sign(
        {
        _id: this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
      )
}

export const User = mongoose.model("User", userSchema);
