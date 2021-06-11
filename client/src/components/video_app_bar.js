import react from 'react';
import reactDom from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faComment, faComments, faHandPaper, faMicrophone, faVideo, faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import './video-appbar.css';

export default function VideoAppBar(props){



    return <div class="video-bar">
        <button class="video-bar-item"><FontAwesomeIcon icon={faMicrophone} ></FontAwesomeIcon></button>
        <button class="video-bar-item"><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon></button>
        <button class="video-bar-item"><FontAwesomeIcon icon={faComments}></FontAwesomeIcon></button>
        <button class="video-bar-item"><FontAwesomeIcon icon={faHandPaper}></FontAwesomeIcon></button>
        <button class="video-bar-item"><FontAwesomeIcon icon={faWindowMaximize}></FontAwesomeIcon></button>
    </div>;
}