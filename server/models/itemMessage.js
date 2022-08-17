import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String], 
        default: []
    },
    createdAt: {
        type:Date,
        default: new Date()
    },
});

const ItemMessage = mongoose.model('ItemMessage', itemSchema);

export default ItemMessage;