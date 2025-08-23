import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const url = "http://localhost:4000";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumData] = useState([]);
  const [track, setTrack] = useState(null); // start with null
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  // Play current track
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.1;
      setPlayStatus(true);
    }
  };

  // Pause current track
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // Previous track
 const previous = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })

    }
  // Next track
   const next = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index < songsData.length-1) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

  // Play a track by ID
  const playWithId = (id) => {
    if (!audioRef.current) return;
    setTrack(songsData[id]);
    setTimeout(() => audioRef.current?.play(), 100);
    setPlayStatus(true);
  };

  // Seek in track
  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  // Fetch songs from backend
  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/listSong`);
      setSongsData(response.data.allSongs);
      if (response.data.allSongs.length > 0) {
        setTrack(response.data.allSongs[0]); 
      }
    } catch (err) {
      console.error("Error fetching songs:", err);
    }
  };

  // Fetch albums from backend
  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/listAlbum`);
      setAlbumData(response.data.allAlbums);
    } catch (err) {
      console.error("Error fetching albums:", err);
    }
  };

  // Update seek bar and time
  useEffect(() => {
    const interval = setTimeout(() => {
      if (audioRef.current && seekBar.current) {
        audioRef.current.ontimeupdate = () => {
          seekBar.current.style.width =
            Math.floor(
              (audioRef.current.currentTime * 100) / audioRef.current.duration
            ) + "%";
          setTime({
            currentTime: {
              second: Math.floor(audioRef.current.currentTime % 60),
              minute: Math.floor(audioRef.current.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audioRef.current.duration % 60),
              minute: Math.floor(audioRef.current.duration / 60),
            },
          });
        };
      }
    }, 500);

    return () => clearTimeout(interval);
  }, [audioRef, track]);

  // Fetch songs and albums on mount
  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    next,
    previous,
    play,
    pause,
    playWithId,
    seekBar,
    seekBg,
    seekSong,
    time,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
