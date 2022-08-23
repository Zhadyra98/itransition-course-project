import mongoose from "mongoose";
import CollectionModel from "../models/CollectionModel.js";

export const getCollections = async (req, res) => {
    try {
        const collections = await CollectionModel.find();
        res.json({ status: 'ok' , data: collections});
        console.log(collections);
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

export const getCollection = async (req, res) => {
    const { id } = req.params;
    try {
        const collection = await CollectionModel.findById(id);
        res.status(200).json(collection);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}