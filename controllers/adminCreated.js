const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Secret = require("../config/credentials");

const adminPayload = {
  username: "Suraj97",
  email: "surajkarosia97@gmail.com",
  password: "Suraj@9926858505",
};

const register = async (req, res) => {
  try {
    const { username, email } = adminPayload;

    const existingAdmin = await Admin.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingAdmin) {
        console.log("Admin with this username or email already exists.");
        return;
    }
    const admin = new Admin(adminPayload);
    const data = await admin.save();
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        isAdmin: admin.isAdmin,
      },
      Secret.jwt_secret
    );
    console.log(token);
  } catch (err) {
    console.log(err);
  }
};

module.exports = register;
