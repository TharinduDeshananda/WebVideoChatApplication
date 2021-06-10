import react, { useContext, useEffect, useRef } from 'react';
import reactDom from 'react-dom';

export function VideoComp(props){
    let videoRef = useRef(null);
    useEffect(()=>{
        videoRef.current.srcObject = props.streamObj;
        videoRef.current.autoplay=true;
        videoRef.current.muted=true;
    })

    return <video ref={videoRef} style={{width:400,height:300,}}></video>;
}

