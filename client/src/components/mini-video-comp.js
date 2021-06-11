import {react,useRef,useEffect} from 'react';
import reactDom from 'react-dom';
import './mini-video-comp.css'

export default function MiniVideoComp(props){
    let videoRef = useRef(null);
  useEffect(() => {
    videoRef.current.srcObject = props.streamObj;
    videoRef.current.autoplay = true;
    videoRef.current.muted = true;
    
  });

  return (
    <div >
      
      <video ref={videoRef} className="mini-video"></video>
    </div>
  );
}

