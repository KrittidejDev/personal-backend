import express from "express";
import * as categoryController from "../controllers/categoryController.mjs";
import { protect } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get("/", protect, categoryController.getCategories);
router.get("/:id", protect, categoryController.getCategoryById);
router.post("/", protect, categoryController.createCategory);
router.put("/:id", protect, categoryController.updateCategory);
router.delete("/:id", protect, categoryController.deleteCategory);

export default router;
