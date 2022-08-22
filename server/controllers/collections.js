import mongoose from "mongoose";
import CollectionModel from "../models/CollectionModel.js";

export const getCollections = async (req, res) => {
    try {
        const collections = await CollectionModel.find();
        res.json({ status: 'ok' , data: collections});
    } catch(error){
        res.json({ status: 'error', message: error.message})
    }
}

export const createCollection = async (req, res) => {
    const collection = req.body;
    const newCollection = new CollectionModel({ ...collection, creator: req.user._id });
    try {
        await newCollection.save();
        res.json({ status: 'ok', newCollection});
    } catch(error) {
        res.json({ status: 'error', message: error.message })
    } 
}