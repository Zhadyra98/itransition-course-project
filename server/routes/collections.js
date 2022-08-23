import express from 'express';
import multer from 'multer';
import { getCollections, createCollection, getCollection } from '../controllers/collections.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../../client/public/uploads");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

router.get('/', getCollections);
router.get('/:id', getCollection);
router.post('/', auth, upload.single("collectionImage"), createCollection);


export default router;