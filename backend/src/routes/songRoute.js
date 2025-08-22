import express from 'express';
import { addSong, listSong, DeleteSong } from '../controllers/songController.js';
import upload from '../middleware/multer.js';

const songRouter = express.Router()

songRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), addSong);
songRouter.get('/listSong',listSong);
songRouter.delete('/DeleteSong',DeleteSong)

export default songRouter;