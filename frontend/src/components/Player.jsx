// import React, { useContext } from 'react'
// import { assets } from '../../assets/assets.js'
// import { PlayerContext } from '../../context/PlayerContext.jsx'

// const Player = () => {

//     const { track, playStatus, play, pause, previous, next, seekBar, seekBg, seekSong, time } = useContext(PlayerContext);

//     return (
//         <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
//             <div className='hidden items-center gap-4 lg:flex'>
//                 <img className='w-12' src={track.image} alt="" />
//                 <div>
//                     <p>{track.name}</p>
//                     <p>{track.desc.slice(0, 12)}</p>
//                 </div>
//             </div>
//             <div className='flex flex-col items-center gap-1 m-auto'>
//                 <div className='flex gap-4'>
//                     <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
//                     <img className='w-4 cursor-pointer' onClick={previous} src={assets.prev_icon} alt="" />
//                     {playStatus
//                         ? <img className='w-4 cursor-pointer' onClick={pause} src={assets.pause_icon} alt="" />
//                         : <img className='w-4 cursor-pointer' onClick={play} src={assets.play_icon} alt="" />
//                     }
//                     <img className='w-4 cursor-pointer' onClick={next} src={assets.next_icon} alt="" />
//                     <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
//                 </div>
//                 <div className='flex items-center gap-5'>
//                     <p>{time.currentTime.minute}:{time.currentTime.second}</p>
//                     <div onClick={seekSong} ref={seekBg} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
//                         <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
//                     </div>
//                     <p>{time.totalTime.minute}:{time.totalTime.second}</p>
//                 </div>
//             </div>
//             <div className='hidden items-center gap-2 opacity-75 lg:flex'>
//                 <img className='w-4' src={assets.plays_icon} alt="" />
//                 <img className='w-4' src={assets.mic_icon} alt="" />
//                 <img className='w-4' src={assets.queue_icon} alt="" />
//                 <img className='w-4' src={assets.speaker_icon} alt="" />
//                 <img className='w-4' src={assets.volume_icon} alt="" />
//                 <div className='w-20 bg-slate-50'>
//                     <hr className='h-1 bg-slate-50 rounded' />
//                 </div>
//                 <img className='w-4' src={assets.mini_player_icon} alt="" />
//                 <img className='w-4' src={assets.zoom_icon} alt="" />
//             </div>
//         </div>
//     )
// }

// export default Player


// import React, { useContext } from 'react';
// import { assets } from '../assets/assets.js';
// import { PlayerContext } from '../context/PlayerContext.jsx';

// const Player = () => {
//     const {
//         track,
//         playStatus,
//         play,
//         pause,
//         previous,
//         next,
//         seekBar,
//         seekBg,
//         seekSong,
//         time,
//     } = useContext(PlayerContext);

//     return (
//         <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            
//             {/* Left section: track info */}
//             <div className='hidden items-center gap-4 lg:flex'>
//                 {track ? (
//                     <>
//                         <img className='w-12' src={track.image} alt={track.name} />
//                         <div>
//                             <p>{track.name}</p>
//                             <p>{track.desc?.slice(0, 12)}</p>
//                         </div>
//                     </>
//                 ) : (
//                     <p>Loading track...</p>
//                 )}
//             </div>

//             {/* Center section: controls and seek bar */}
//             <div className='flex flex-col items-center gap-1 m-auto'>
//                 <div className='flex gap-4'>
//                     <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="Shuffle" />
//                     <img className='w-4 cursor-pointer' onClick={previous} src={assets.prev_icon} alt="Previous" />
//                     {playStatus ? (
//                         <img className='w-4 cursor-pointer' onClick={pause} src={assets.pause_icon} alt="Pause" />
//                     ) : (
//                         <img className='w-4 cursor-pointer' onClick={play} src={assets.play_icon} alt="Play" />
//                     )}
//                     <img className='w-4 cursor-pointer' onClick={next} src={assets.next_icon} alt="Next" />
//                     <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="Loop" />
//                 </div>

//                 <div className='flex items-center gap-5'>
//                     <p>{time?.currentTime?.minute}:{time?.currentTime?.second}</p>
//                     <div
//                         onClick={seekSong}
//                         ref={seekBg}
//                         className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'
//                     >
//                         <hr
//                             ref={seekBar}
//                             className='h-1 border-none w-0 bg-green-800 rounded-full'
//                         />
//                     </div>
//                     <p>{time?.totalTime?.minute}:{time?.totalTime?.second}</p>
//                 </div>
//             </div>

//             {/* Right section: extra icons */}
//             <div className='hidden items-center gap-2 opacity-75 lg:flex'>
//                 <img className='w-4' src={assets.plays_icon} alt="Plays" />
//                 <img className='w-4' src={assets.mic_icon} alt="Mic" />
//                 <img className='w-4' src={assets.queue_icon} alt="Queue" />
//                 <img className='w-4' src={assets.speaker_icon} alt="Speaker" />
//                 <img className='w-4' src={assets.volume_icon} alt="Volume" />
//                 <div className='w-20 bg-slate-50'>
//                     <hr className='h-1 bg-slate-50 rounded' />
//                 </div>
//                 <img className='w-4' src={assets.mini_player_icon} alt="Mini player" />
//                 <img className='w-4' src={assets.zoom_icon} alt="Zoom" />
//             </div>
//         </div>
//     );
// };

// export default Player;



import  { useContext } from "react";
import { assets } from "../assets/assets.js";
import { PlayerContext } from "../context/PlayerContext.jsx";

const Player = () => {
  const {
    track,
    playStatus,
    play,
    pause,
    previous,
    next,
    seekBar,
    seekBg,
    seekSong,
    time,
  } = useContext(PlayerContext);

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Left section: track info */}
      <div className="hidden items-center gap-4 lg:flex">
        {track ? (
          <>
            <img className="w-12" src={track.image} alt={track.name} />
            <div>
              <p>{track.name}</p>
              <p>{track.desc?.slice(0, 12)}</p>
            </div>
          </>
        ) : (
          <p>Loading track...</p>
        )}
      </div>

      {/* Center section: controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt="Shuffle"
          />
          <img
            className="w-4 cursor-pointer"
            onClick={previous}
            src={assets.prev_icon}
            alt="Previous"
          />
          {playStatus ? (
            <img
              className="w-4 cursor-pointer"
              onClick={pause}
              src={assets.pause_icon}
              alt="Pause"
            />
          ) : (
            <img
              className="w-4 cursor-pointer"
              onClick={play}
              src={assets.play_icon}
              alt="Play"
            />
          )}
          <img
            className="w-4 cursor-pointer"
            onClick={next}
            src={assets.next_icon}
            alt="Next"
          />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" />
        </div>

        {/* Seek bar */}
        <div className="flex items-center gap-5">
          <p>
            {time?.currentTime?.minute}:{time?.currentTime?.second}
          </p>
          <div
            onClick={seekSong}
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time?.totalTime?.minute}:{time?.totalTime?.second}
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="hidden items-center gap-2 opacity-75 lg:flex">
        <img className="w-4" src={assets.plays_icon} alt="Plays" />
        <img className="w-4" src={assets.mic_icon} alt="Mic" />
        <img className="w-4" src={assets.queue_icon} alt="Queue" />
        <img className="w-4" src={assets.speaker_icon} alt="Speaker" />
        <img className="w-4" src={assets.volume_icon} alt="Volume" />
        <div className="w-20 bg-slate-50">
          <hr className="h-1 bg-slate-50 rounded" />
        </div>
        <img className="w-4" src={assets.mini_player_icon} alt="Mini player" />
        <img className="w-4" src={assets.zoom_icon} alt="Zoom" />
      </div>
    </div>
  );
};

export default Player;
