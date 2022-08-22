import express from 'express';
import { getCollections, createCollection } from '../controllers/collections.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCollections);
router.post('/', auth, createCollection);


export default router;