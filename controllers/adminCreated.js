const Admin = require("../models/User");

const adminPayload = {
  username: "Suraj97",
  email: "surajkarosia97@gmail.com",
  password: "Suraj@9926858505",
  isAdmin: true,
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
    await admin.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = register;
