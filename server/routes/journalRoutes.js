import { getAllJournals, getJournalById, createJournal, deleteJournalById, updateJournalById} from "../controllers/journalController.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const journalRouter = express.Router();

// Journal routes
journalRouter.get("/", authMiddleware, getAllJournals);
journalRouter.get("/:id", authMiddleware, getJournalById);

// Protected routes
journalRouter.post("/", authMiddleware, createJournal);
journalRouter.put("/:id", authMiddleware, updateJournalById);
journalRouter.delete("/:id", authMiddleware, deleteJournalById);

export default journalRouter;