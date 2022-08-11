import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type:Date,
        default: new Date()
    },
});

const ItemMessage = mongoose.model('ItemMessage', itemSchema);

export default ItemMessage;