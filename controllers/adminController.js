const User = require("../models/User");
module.exports = {
  approveUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByIdAndUpdate(userId, { approved: true });
      res.send({ message: "User approved successfully" });
    } catch (err) {
      res.status(400).send({ message: "Error approving user" });
    }
  },
};
