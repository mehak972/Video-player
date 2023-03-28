import React from "react";
import '../App.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Forward10Icon from '@mui/icons-material/Forward10';
import Replay10Icon from '@mui/icons-material/Replay10';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Fullscreen } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function ValueLabelComponent(props) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0}  placement="top-start" title={value}>
        {children}
      </Tooltip>
    );
  }

const PrettoSlider = styled(Slider)({
  
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

const PlayerControls=({onPlayPause,playing,rewind,fastForward,muted,onMute,playbackRate,onPlaybackRateChange,played,
elapsedTime,totalDuration })=>{

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopover = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'playbackrate-popover' : undefined;
  

    return(
    <div className="controls">
        {/* Top grid */}
    <Grid container direction='row' alignItems='center' justifyContent='start' style={{padding: 16 }}>
            <Grid item>
              <Typography variant='h5' style={{color:'white'}}>Player</Typography>
            </Grid>
         </Grid>
      
      {/* Middle grid */}
      <Grid container direction="row"  alignItems={"center"} justifyContent="center" >
      <IconButton onClick={rewind} className='controlsIcons' aria-label='reqind'>
        <Replay10Icon  fontSize="large"  />
      </IconButton>

      <IconButton onClick={onPlayPause} className='controlsIcons' aria-label='reqind'>
       {playing?<PauseIcon fontSize="large" />:(<PlayArrowIcon  fontSize="large" style={{ color: "white" }} />)}
      </IconButton>

      <IconButton onClick={fastForward} className='controlsIcons' aria-label='reqind'>
        <Forward10Icon  fontSize="large"  />
      </IconButton>
      </Grid>

      {/* Bottom Grid */}
      <Grid container direction='row' alignItems='center' justifyContent='space-between' style={{padding: 16}}>
        <Grid item xs={12}>
        <PrettoSlider min={0} max={100} value={played*100} ValueLabelComponent={ValueLabelComponent} 
        />
       </Grid>

       <Grid item>
          <Grid container direction='row' alignItems='center'>
          <IconButton onClick={onPlayPause} className="controlsIcons" aria-label="reqind">
          {playing?<PauseIcon fontSize="large" style={{ color: "white" }} />:( <PlayArrowIcon fontSize="large" style={{ color: "white" }} />)}
          </IconButton>

          <IconButton onClick={onMute} className="controlsIcons" aria-label="reqind">
           {muted?<VolumeOffIcon fontSize="large" style={{ color: "white" }}/>:<VolumeUpIcon fontSize="large" style={{ color: "white" }} />}
          </IconButton>
        
         
         <Button variant="text" style={{color:"#fff",marginLeft:16}}>
            <Typography>{elapsedTime}/{totalDuration}</Typography>
         </Button>
         
 </Grid>

          </Grid>
            <Grid item>
              <Button onClick={handlePopover} variant="text" className="controlsIcons">
              <Typography>{playbackRate}</Typography>
              </Button>

              
             <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
             anchorOrigin={{
             vertical: 'bottom',
              horizontal: 'left',}}>
              <Grid container direction="column-reverse">
             {[0.5,1,1.5,2].map(rate=>(
             <Button onClick={()=>onPlaybackRateChange(rate)} variant="text">
              <Typography color="secondary">{rate}</Typography>
            </Button>))}
             </Grid>
            </Popover>
           
             <IconButton className="controlIcons">
              <Fullscreen fontSize="large" style={{color:"blue"}} />
             </IconButton>
            </Grid>


      </Grid>
    </div>

    )
}

export default PlayerControls;