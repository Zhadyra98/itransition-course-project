import mongoose from "mongoose";

const collectionSchema = mongoose.Schema({
    collectionName : String,
    description : String,
    topic : String,
    collectionImage : String,
    creator: { type: mongoose.Schema.ObjectId, ref: 'User'},
});

const CollectionModel = mongoose.model('CollectionModel', collectionSchema);

export default CollectionModel;