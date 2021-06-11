import react, { useContext, useEffect, useRef } from "react";
import reactDom from "react-dom";
import './video-comp.css'
export function VideoComp(props) {
  let videoRef = useRef(null);
  useEffect(() => {
    videoRef.current.srcObject = props.streamObj;
    videoRef.current.autoplay = true;
    videoRef.current.muted = true;
    
  });

  return (
    <div >
      
      <video ref={videoRef} className="video-component"></video>
    </div>
  );
}
