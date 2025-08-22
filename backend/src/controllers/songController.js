import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;

    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    // console.log(name,desc,album,audioUpload,imageUpload);
    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };
    const song = songModel(songData);
    await song.save();

    res.status(201).json({
      success: true,
      message: "Song Added Successfully ",
      song
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};
const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    // console.log(allSongs);
    res.status(201).json({
        success:true,
        message:"All song Get Successfully",
        allSongs
    })
  } catch (error) {
    res.json({
        success:false,
        message:error
    })
    // console.log(error)
  }
};


const DeleteSong = async (req, res) => {

    try {

        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song Remove"});

    } catch (error) {

        res.json({ success: false });
        
    }

}

export { addSong, listSong, DeleteSong }