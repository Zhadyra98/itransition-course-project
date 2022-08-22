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

export const createCollection =   async (req, res) => {
    const { collectionName, description, collectionImage, topic } = req.body;
    const collection = {
        collectionName, 
        description, 
        collectionImage, 
        topic, 
        creator: req.userId,
    };
    try {
        const newCollection = await CollectionModel.create(collection);
        res.json({ status: 'ok', newCollection});
    } catch(error) {
        res.json({ status: 'error', message: error.message })
    } 
}