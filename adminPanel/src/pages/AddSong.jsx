
import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import { url } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [album, setAlbum] = useState('none'); // default is "none"
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!song || !image) {
      toast.error('Please upload both song and image.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('audio', song);
      formData.append('album', album);

      const response = await axios.post(`${url}/api/song/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success('Song Added Successfully');
        // Reset form
        setName('');
        setDesc('');
        setAlbum('none'); // reset to "none"
        setImage(null);
        setSong(null);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/listAlbum`);
      const albums = response.data.allAlbums || [];
      setAlbumData(albums);
    } catch (error) {
      console.error(error);
      setAlbumData([]);
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      {/* Uploads */}
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            type="file"
            id="song"
            accept="audio/*"
            hidden
            onChange={(e) => setSong(e.target.files[0])}
          />
          <label htmlFor="song">
            <img
              className="w-24 cursor-pointer"
              src={song ? assets.upload_added : assets.upload_song}
              alt="Upload Song"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="image">
            <img
              className="w-24 cursor-pointer"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Image"
            />
          </label>
        </div>
      </div>

      {/* Song Name */}
      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>

      {/* Song Description */}
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          type="text"
          placeholder="Type here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>

      {/* Album Select */}
      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
        >
       
          <option value="none">None</option>

          {/* Map all albums from API */}
          {albumData.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;
