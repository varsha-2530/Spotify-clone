import { useContext } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Player from './components/Player.jsx';
import Display from './components/Display.jsx';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext); 
  //console.log(audioRef,track,songsData)

  return (
    <div className="h-screen bg-black">
     
      {songsData && songsData.length > 0 ? (   // ✅ safe check
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : (
        <div className="h-[90%] flex items-center justify-center text-white text-lg">
          No songs loaded
        </div>
      )}

      {/* Only render audio element if a track exists */}
      {track && <audio ref={audioRef} src={track.file} preload="auto"></audio>}
    </div>
  );
};

export default App;
