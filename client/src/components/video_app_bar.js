import {react,useState} from 'react';
import reactDom from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faComment, faComments, faHandPaper, faMicrophone, faShare, faVideo, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import './video-appbar.css';

export default function VideoAppBar(props){
    let [muted,setMuted] = useState(false);
    let [videoOff,setVideoOff] = useState(false);


    return <div className="video-bar">
        <button className="video-bar-item"><FontAwesomeIcon icon={faMicrophone} ></FontAwesomeIcon></button>
        <button className="video-bar-item"><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon></button>
        <button onClick={props.share} className="video-bar-item"><FontAwesomeIcon icon={faShare}></FontAwesomeIcon></button>
        <button className="video-bar-item"><FontAwesomeIcon icon={faComments}></FontAwesomeIcon></button>
        <button className="video-bar-item"><FontAwesomeIcon icon={faHandPaper}></FontAwesomeIcon></button>
        <button className="video-bar-item"><FontAwesomeIcon icon={faWindowMaximize}></FontAwesomeIcon></button>
    </div>;
}