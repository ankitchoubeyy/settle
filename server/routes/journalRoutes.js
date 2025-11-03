import { getAllJournals, getJournalById, createJournal, deleteJournalById, updateJournalById} from "../controllers/journalController.js";
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const journalRouter = express.Router();

// Journal routes
journalRouter.get("/", getAllJournals);
journalRouter.get("/:id", getJournalById);

// Protected routes
journalRouter.post("/", protect, createJournal);
journalRouter.put("/:id", protect, updateJournalById);
journalRouter.delete("/:id", protect, deleteJournalById);

export default journalRouter;