import mongoose from "mongoose";


const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Notes", NoteSchema);

