import express from "express";
import { addNote, deleteNote, getAllNotes, updateNote } from "../controllers/notesController.js";
import { verifyToken } from "../middleware/middleware.js";
const router = express.Router();


router.get("/", verifyToken, getAllNotes)
router.post("/", verifyToken, addNote)
router.put("/:id", verifyToken, updateNote)
router.delete("/:id", verifyToken, deleteNote)

export default router;