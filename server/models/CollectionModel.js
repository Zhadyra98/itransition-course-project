import mongoose from "mongoose";

const collectionSchema = mongoose.Schema({
    name : String,
    description : String,
    topic : String,
    image : String,
    creator: { type: mongoose.Schema.ObjectId, ref: 'User'},
});

const CollectionModel = mongoose.model('CollectionModel', collectionSchema);

export default CollectionModel;