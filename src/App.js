import React,{useState,useRef} from "react";
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ReactPlayer from 'react-player';
import introVideo from "./sources/Speech.mp4";
import PlayerControls from "./components/PlayerControls"; 



const format = (seconds) => {
  if (isNaN(seconds)) {
    return '00:00'
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
  } else {
      return `${mm}:${ss}`
  }
}

function App() {
 const[state,setState]=useState({
  playing:true,
  muted:true,
  playbackRate:1.0,
  played:0


 })
 const{playing,muted,playbackRate,played}=state;

 const playerRef= useRef(null);

 const handleRewind=()=>{
  playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10,'seconds' )
 }

 const handleFastForward=()=>{
  playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10,'seconds' )
 }

 const handlePlayPause=()=>{
  setState({...state,playing:!state.playing});
 }

 const handleMute=()=>{
  setState({...state,muted:!state.muted});
 }

 const handlePlaybackRateChange=(rate)=>{
  setState({...state,playbackRate:rate})
 }

 const handleProgress=(changeState)=>{
  console.log(changeState);
  setState({...state,...changeState})
 }



const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';

const elapsedTime= format(currentTime)
const totalDuration=format(duration)

  return (
  <>
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">React Video Player</Typography>
    </Toolbar>
  </AppBar>
  <Toolbar/>
    <Container maxWidth="md">
      <div className="player">
      <ReactPlayer width={"100%"} height="100%"
      url={introVideo} 
      ref={playerRef}
      muted={muted} playing={playing} playbackRate={playbackRate} onProgress={handleProgress}
      />
      <PlayerControls
      onPlayPause={handlePlayPause} playing={playing} rewind={handleRewind} fastForward={handleFastForward}
      muted={muted} onMute={handleMute} playbackRate={playbackRate} onPlaybackRateChange={handlePlaybackRateChange}
      played={played}  elapsedTime={elapsedTime} totalDuration={totalDuration}
      />

    </div>
    </Container>
    
  </>
  
  );
}

export default App;
