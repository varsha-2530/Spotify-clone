import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all albums from backend
  const fetchAlbums = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/album/listAlbum`);
      if (response.data.success) {
        setData(response.data.allAlbums || []); // backend key is 'allAlbums'
      } else {
        setData([]);
        toast.error("Failed to fetch albums");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error occurred while fetching albums");
      console.error(error);
    }
  };

  // Delete album
  const removeAlbum = async (id) => {
    

    try {
      const response = await axios.delete(`${url}/api/album/deleteAlbum`, {
        data: { id },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Album deleted");
        fetchAlbums();
      } else {
        toast.error(response.data.message || "Failed to delete album");
      }
    } catch (error) {
      toast.error("Error occurred while deleting album");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-center mt-10 text-gray-600">No albums found.</p>;
  }

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4">All Albums List</p>
      <div>
        {/* Header row for larger screens */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>

        {/* Album list */}
        {data?.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm my-2 rounded hover:bg-gray-50"
          >
            <img className="w-12 h-12 object-cover rounded" src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input type="color" value={item.bgcolor} readOnly />
            <p
              className="cursor-pointer text-red-500 hover:text-red-700 font-bold text-center"
              onClick={() => removeAlbum(item._id)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
