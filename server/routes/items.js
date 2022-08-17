import express from 'express';
import { getItemsBySearch, getItems, getItem, createItem, updateItem, commentItem, deleteItem, likeItem } from '../controllers/items.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getItem);
router.get('/', getItems);
router.get('/search', getItemsBySearch);
router.post('/', auth, createItem);
router.patch('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);
router.patch('/:id/likeItem', auth, likeItem);
router.post('/:id/commentItem', auth, commentItem);

export default router;