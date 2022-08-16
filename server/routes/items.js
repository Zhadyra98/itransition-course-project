import express from 'express';
import { getItemsBySearch, getItems, createItem, updateItem, deleteItem, likeItem } from '../controllers/items.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getItems);
router.get('/search', getItemsBySearch);
router.post('/', auth, createItem);
router.patch('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);
router.patch('/:id/likeItem', auth, likeItem);

export default router;