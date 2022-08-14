import express from 'express'
import { getItems, createItem, updateItem, deleteItem, likeItem } from '../controllers/items.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.patch('/:id', updateItem);
router.delete('/:id', deleteItem);
router.patch('/:id/likeItem', likeItem);

export default router;