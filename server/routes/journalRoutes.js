import { getAllJournals, getJournalById, createJournal, deleteJournalById } from "../controllers/journalController.js";
import express from "express";

const journalRouter = express.Router();

// Journal routes
journalRouter.get("/", getAllJournals);
journalRouter.get("/:id", getJournalById);
journalRouter.post("/", createJournal);
journalRouter.delete("/:id", deleteJournalById);

export default journalRouter;