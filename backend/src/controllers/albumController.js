import { v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js';


const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgcolor } = req.body;
    const imageFile = req.file;

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgcolor,
      image: imageUpload.secure_url,
    };
    const album = albumModel(albumData);
    await album.save();
    res.status(201).json({
      success: true,
      message: "Album created successfully",
      album,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating album",
      error: error.message,
    });
  }
};


const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    res.status(201).json({
      success: true,
      message: "All Album Get successfully",
      allAlbums,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching albums",
      error: error.message,
    });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Album ID is required",
      });
    }

    const album = await albumModel.findById(id);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    // 🔹 delete Cloudinary image
    if (album.public_id) {
      await cloudinary.uploader.destroy(album.public_id, {
        resource_type: "image",
      });
    }

    await albumModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Album deleted successfully",
      deletedAlbum: album,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting album",
      error: error.message,
    });
  }
};

export { addAlbum, listAlbum, deleteAlbum };