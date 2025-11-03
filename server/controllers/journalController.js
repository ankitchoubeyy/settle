import Journal from "../models/JournalModel.js";
import analyseJournal from "../services/geminiAiServices.js";

// 🧾 Get all journals for logged-in user
export const getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🧾 Get one journal (user can only access their own)
export const getJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await Journal.findOne({ _id: id, user: req.user._id });

    if (!journal) return res.status(404).json({ error: "Journal not found or access denied" });

    res.json(journal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✍️ Create a new journal (AI analysis included)
export const createJournal = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Journal content is required" });

    // AI sentiment & feedback
    const { sentiment, feedback } = await analyseJournal(content);

    const journal = await Journal.create({
      user: req.user._id,
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

// 🔁 Update journal (only if belongs to user)
export const updateJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const journal = await Journal.findOne({ _id: id, user: req.user._id });
    if (!journal) return res.status(404).json({ error: "Journal not found or access denied" });

    let sentiment = journal.sentiment;
    let aiFeedback = journal.aiFeedback;

    if (content && content !== journal.content) {
      const analysis = await analyseJournal(content);
      sentiment = analysis.sentiment;
      aiFeedback = analysis.feedback;
    }

    journal.content = content || journal.content;
    journal.sentiment = sentiment;
    journal.aiFeedback = aiFeedback;
    await journal.save();

    res.json({ success: true, message: "Journal updated", journal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🗑️ Delete journal (only if belongs to user)
export const deleteJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await Journal.findOneAndDelete({ _id: id, user: req.user._id });

    if (!journal) return res.status(404).json({ error: "Journal not found or access denied" });

    res.json({ success: true, message: "Journal deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
