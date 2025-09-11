import express from "express";
import multer from "multer";
import {
  uploadController,
  deleteController,
} from "../controllers/uploadController.mjs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadController);
router.delete("/delete", deleteController);

export default router;
