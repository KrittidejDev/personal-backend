import * as adminService from "../services/adminService.mjs";

// GET /api/admin
export const getAdmin = async (req, res) => {
  try {
    const admin = await adminService.getAdminInfo();
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ admin, status: 200 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/admin (สร้างครั้งแรก)
export const createAdmin = async (req, res) => {
  try {
    const admin = await adminService.createAdmin(req.body);
    res.status(201).json({ admin, status: 201 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/admin/:id
export const updateAdmin = async (req, res) => {
  try {
    const admin = await adminService.updateAdmin(req.params.id, req.body);
    res.status(200).json({ admin, status: 200 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH /api/admin/:id/password
export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old and new password required" });
    }

    await adminService.changeAdminPassword(
      req.params.id,
      oldPassword,
      newPassword
    );

    res.status(200).json({
      message: "Admin password updated successfully",
      status: 200,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
