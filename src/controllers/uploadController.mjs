import { uploadFile, deleteFile } from "../services/uploadService.mjs";

export const uploadController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadFile(req.file);

    res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
      status: 201,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteController = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id)
      return res.status(400).json({ message: "No public_id provided" });

    const result = await deleteFile(public_id);
    res.status(200).json({
      message: "File deleted successfully",
      result,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
