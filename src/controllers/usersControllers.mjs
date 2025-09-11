import * as userService from "../services/userServices.mjs";

// GET /api/users/:id
export const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user, status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ user: updatedUser, status: 200 });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// PATCH /api/users/:id/password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old and new password required" });
    }

    await userService.changePassword(req.params.id, oldPassword, newPassword);
    res
      .status(200)
      .json({ message: "Password updated successfully", status: 200 });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};
