import Journal from "../models/JournalModel.js";
import analyseJournal from "../services/geminiAiServices.js";

// Get all journals
export const getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.find().populate("user", "name email");
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get journal by ID
export const getJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Journal ID is required" });

    const journal = await Journal.findById(id).populate("user", "name email");
    if (!journal) return res.status(404).json({ error: "Journal not found" });

    res.json(journal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new journal (with AI analysis)
export const createJournal = async (req, res) => {
  try {
    const { user, content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Journal content is required" });
    }

    // Analyze sentiment and feedback using Gemini AI
    const { sentiment, feedback } = await analyseJournal(content);

    const journal = await Journal.create({
      user,
      content,
      sentiment,
      aiFeedback: feedback,
    });

    res.status(201).json({
      success: true,
      message: "Journal created successfully",
      journal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update journal by ID (and re-analyze with AI)
export const updateJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!id) return res.status(400).json({ error: "Journal ID is required" });

    const existingJournal = await Journal.findById(id);
    if (!existingJournal) return res.status(404).json({ error: "Journal not found" });

    let sentiment = existingJournal.sentiment;
    let aiFeedback = existingJournal.aiFeedback;

    // Re-run AI analysis only if content changes
    if (content && content !== existingJournal.content) {
      const analysis = await analyseJournal(content);
      sentiment = analysis.sentiment;
      aiFeedback = analysis.feedback;
    }

    const updatedJournal = await Journal.findByIdAndUpdate(
      id,
      { ...req.body, sentiment, aiFeedback },
      { new: true }
    );

    res.json({
      success: true,
      message: "Journal updated successfully",
      updatedJournal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete journal by ID
export const deleteJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Journal ID is required" });

    const deletedJournal = await Journal.findByIdAndDelete(id);
    if (!deletedJournal) return res.status(404).json({ error: "Journal not found" });

    res.json({
      success: true,
      message: "Journal deleted successfully",
      deletedJournal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
