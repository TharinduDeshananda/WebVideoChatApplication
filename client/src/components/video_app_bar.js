import {react,useState} from 'react';
import reactDom from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faComment, faComments, faDesktop, faHandPaper, faMicrophone, faShare, faVideo, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import './video-appbar.css';

export default function VideoAppBar(props){
    let [muted,setMuted] = useState(false);
    let [videoOff,setVideoOff] = useState(false);
    let [hosting,setHosting]=useState(false);
    let [sharing,setSharing] = useState(false);
    let [fullScreen,setFullScreen] = useState(false);

    return <div className="video-bar">
        <button onClick={props.gaudio} className="video-bar-item"><FontAwesomeIcon icon={faMicrophone} ></FontAwesomeIcon></button>
        <button onClick={props.gvideo} className="video-bar-item"><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon></button>
        <button onClick={props.gshare} className="video-bar-item"><FontAwesomeIcon icon={faShare}></FontAwesomeIcon></button>
        <button onClick={props.gchat}className="video-bar-item"><FontAwesomeIcon icon={faComments}></FontAwesomeIcon></button>
        <button onClick={props.ghost} className="video-bar-item"><FontAwesomeIcon icon={faDesktop}></FontAwesomeIcon></button>
        <button onClick={props.gfull} className="video-bar-item"><FontAwesomeIcon icon={faWindowMaximize}></FontAwesomeIcon></button>
    </div>;
}