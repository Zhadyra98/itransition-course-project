import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
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

const ItemModel = mongoose.model('ItemModel', itemSchema);

export default ItemModel;