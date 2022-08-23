import mongoose from "mongoose";
import ItemModel from "../models/ItemModel.js";

export const getItems = async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.json({ status: 'ok' , data: items});
    } catch(error){
        res.json({ status: 'error', message: error.message})
    }
}

export const getItemsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const message = new RegExp(searchQuery, 'i');
        const items = await ItemModel.find({ $or:[ {title } , {message}]} );
        res.json({ data: items });

        res.json({data: searchQuery});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await ItemModel.findById(id);

        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createItem = async (req, res) => {
    const item = req.body;
    const newItem = new ItemModel({ ...item, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newItem.save();
        res.json({ status: 'ok', newItem});
    } catch(error) {
        res.json({ status: 'error', message: error.message })
    } 
}

export const updateItem = async (req, res) => {
    const { id: _id } = req.params;
    const item = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send("No item with that id");

    const updatedItem =  await ItemModel.findByIdAndUpdate(_id, {...item, _id} , { new: true });
    res.json(updatedItem);
}

export const deleteItem = async (req, res) => {
    try{
        const { id:_id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send("No item with that id");
        await ItemModel.findByIdAndRemove(_id);

        res.json({ status: 'ok', message: 'Item deleted scuccessfully' });
    } catch (error) {
        res.json({ status: 'error', message: error.message })
    }
}

export const likeItem = async (req, res) => {
    const { id:_id } = req.params;
    if(!req.userId) return res.json({ message: "Unauthenticated" });
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send("No item with that id");
    const item = await ItemModel.findById(_id);
    const index = item.likes.findIndex((_id) => _id === String(req.userId));

    if(index === -1) {
        item.likes.push(req.userId);
    } else {
        item.likes = item.likes.filter(_id => _id !== String(req.userId));
    }
    const updatedItem = await ItemModel.findByIdAndUpdate(_id, item, { new: true });
    res.json({ status: 'ok', updatedItem });
}

export const commentItem = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const item = await ItemModel.findById(id);
    item.comments.push(value);
    const updatedItem = await ItemModel.findByIdAndUpdate(id, item, { new: true });
    res.json(updatedItem);
}