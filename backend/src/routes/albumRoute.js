import express from 'express';
import { addAlbum, listAlbum, deleteAlbum } from '../controllers/albumController.js';
import upload from '../middleware/multer.js';

const albumRouter = express.Router()

albumRouter.post('/addAlbum', upload.single('image'), addAlbum);
albumRouter.get('/listAlbum',listAlbum);
albumRouter.delete('/deleteAlbum',deleteAlbum)

export default albumRouter;