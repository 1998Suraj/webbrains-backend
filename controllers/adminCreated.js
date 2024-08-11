const Admin = require("../models/User");

const usernam = "Suraj96";
const email = "surajkarosia96@gmail.com";
const password = "Suraj@9926858505";
const adminStatus = true;
const isApprove = "Approved";

const register = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({
      $or: [{ username: usernam }, { email: email }],
    });

    if (existingAdmin) {
      console.log("Admin with this username or email already exists.");
      return;
    }
    const admin = new Admin({
      username: usernam,
      email,
      password,
      isAdmin: adminStatus,
      isApproved: isApprove,
    });
    await admin.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = register;
