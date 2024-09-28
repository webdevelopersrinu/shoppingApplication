import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "place enter your name"],
    },
    email: {
      type: String,
      required: [true, "place enter your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "enter valide email"],
    },
    password: {
      type: String,
      required: [true, "place enter your password"],
      validate: [validator.isStrongPassword, "place enter strong password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "place enter confirm password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "password and confiorm password is not match",
      },
    },
    cardData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

// enctripting password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

// compair password method
userSchema.methods.compairePassword = async function (password, passwordInDb) {
  return await bcryptjs.compare(password, passwordInDb);
};

const user = mongoose.models.user || mongoose.model("user", userSchema);

export default user;
