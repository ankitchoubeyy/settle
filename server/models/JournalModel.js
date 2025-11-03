import mongoose, { mongo } from "mongoose";

const journalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    sentiment: {
        type: String, // (positive, negative, neutral)
    },
    aiFeedback: {
        type: String
    }
}, {
    timestamps: true
})

const Journal = mongoose.model('Journal', journalSchema);

export default Journal;