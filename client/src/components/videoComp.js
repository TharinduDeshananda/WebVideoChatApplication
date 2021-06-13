import react, { useContext, useEffect, useRef,useState } from "react";
import reactDom from "react-dom";
import "./video-comp.css";
export function VideoComp(props) {
  let videoRef = useRef(null);
  let [mainStream, setMainStream] = useState(null);
  useEffect(() => {
    videoRef.current.srcObject = props.streamObj;
    videoRef.current.autoplay = true;
    videoRef.current.muted = true;
  });

  return (
    <div>
      <video ref={videoRef} className="video-component"></video>
    </div>
  );
}
