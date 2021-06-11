import react from 'react';
import reactDom from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faComment, faComments, faHandPaper, faMicrophone, faVideo, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import './video-appbar.css';

export default function VideoAppBar(props){



    return <div className="video-bar">
        <button className="video-bar-item"><FontAwesomeIcon icon={faMicrophone} ></FontAwesomeIcon></button>
        <button className="video-bar-item"><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon></button>
        <button className="video-bar-item"><FontAwesomeIcon icon={faComments}></FontAwesomeIcon></button>
        <button className="video-bar-item"><FontAwesomeIcon icon={faHandPaper}></FontAwesomeIcon></button>
        <button className="video-bar-item"><FontAwesomeIcon icon={faWindowMaximize}></FontAwesomeIcon></button>
    </div>;
}