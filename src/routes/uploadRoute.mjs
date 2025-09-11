import express from "express";
import multer from "multer";
import {
  uploadController,
  deleteController,
} from "../controllers/uploadController.mjs";

const router = express.Router();
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), uploadController);
router.delete("/delete", deleteController);

export default router;
