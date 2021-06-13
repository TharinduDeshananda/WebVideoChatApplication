import react, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import reactDom from "react-dom";
import { io } from "socket.io-client";
import { VideoComp } from "./videoComp";
import VideoAppBar from "./video_app_bar";
import MiniVideoComp from "./mini-video-comp";
import "./main-comp.css";
function MainVideoComponent(props) {
  let joinRoomInputField = useRef(null);
  let [joinRoomInputFieldValue, setJoinRoomInputFieldValue] = useState("");
  let [ownStream, setOwnStream] = useState(null);
  let [ownPeerId, setOwnPeerId] = useState(null);
  let [hostStream, setHostStream] = useState(null);
  let [guestsStreams, setGuestsStreams] = useState([]);
  let [ownPeer, setOwnPeer] = useState(null);
  let [hostPeerId, setHostPeerId] = useState(null);
  let [guestPeerIds, setGuestPeerIds] = useState([]);
  let [ownSocketIO, setOwnSocketIO] = useState(null);
  let [roomID, setRoomID] = useState(null);
  let [guestUsers, setGuestUsers] = useState([]);
  let [guestCallsStruct,setGuestCallsStruct] = useState([]);

  useEffect(() => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    if(!navigator.getUserMedia){
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }, (stream) => {
        setOwnStream(stream);
      });
    }
    else{navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      setOwnStream(stream);
    });}
    let socket = io("http://localhost:3300/");
    setOwnSocketIO(socket);
    let peer = new Peer(undefined, {
      host: "localhost",
      port: 9000,
      key: "peerjs",
      path: "/",
    });
    
    setOwnPeer(peer);
    peer.on("open", (id) => {
      setOwnPeerId(id);
      console.log("own peer id: ", id);
    });
  }, []);

  useEffect(() => {
    if (!ownPeerId || !ownStream || !ownSocketIO) {
      return;
    }

    ownSocketIO.on("room created", (roomId) => {
      setHostPeerId(ownPeerId);
      setHostStream(ownStream); /********inserted this line */
      setGuestPeerIds([]);
      setRoomID(roomId);
      console.log("room created with room id: ", roomId);
      window.alert(roomId);
    });

    ownSocketIO.on("user connected", (newUserPeerId) => {
      console.log("user connected");
      console.log("before guests", guestPeerIds);
      guestPeerIds.push(newUserPeerId);
      setGuestPeerIds(guestPeerIds);
      console.log("after guests", guestPeerIds);
    });

    ownSocketIO.on("room joined", (hostCopy, guestsCopy) => {
      console.log("room joined");
      console.log("host copy", hostCopy);
      console.log("guests copy", guestsCopy);
      setHostPeerId(hostCopy);
      setGuestPeerIds(guestsCopy);
      let hostCall = ownPeer.call(hostCopy, ownStream);
      guestCallsStruct.push(hostCall);//****************************************** */
      setGuestCallsStruct(guestCallsStruct.slice());//**************************** */
      hostCall.on("stream", (remoteStream) => {
        setHostStream(remoteStream);
        console.log("set host stream", remoteStream);
      });

      guestsCopy.forEach((element) => {
        let guestCall = ownPeer.call(element, ownStream);
        guestCallsStruct.push(guestCall);//****************************************** */
        setGuestCallsStruct(guestCallsStruct.slice());//**************************** */
        guestCall.on("stream", (remoteStream) => {
          console.log("called guests stream", remoteStream);
          let flag = false;
          guestsStreams.forEach((stream) => {
            if (stream.id == remoteStream.id) {
              flag = true;
            }
          });
          if (flag) {
            return;
          }
          
          guestsStreams.push(remoteStream);
          setGuestsStreams(guestsStreams.slice()); /************ */
        });
      });
    });

    ownPeer.on("call", (call) => {
      guestCallsStruct.push(call);
      setGuestCallsStruct(guestCallsStruct.slice());
      console.log('****-----*****',call);
      call.answer(ownStream);
      call.on("stream", (remoteStream) => {
        let flag = false;
        guestsStreams.forEach((stream) => {
          if (stream.id == remoteStream.id) {
            flag = true;
          }
        });
        if (flag) {
          return;
        }
        
        guestsStreams.push(remoteStream);
        setGuestsStreams(guestsStreams.slice()); /************** */
        console.log("guests streams 2", guestsStreams);
        console.log("hosts stream 2", hostStream);
      });
    });
  }, [ownPeerId, ownStream, ownSocketIO]);
  function onInputChange(event) {
    setJoinRoomInputFieldValue(event.target.value);
  }

  function createRoom() {
    if (!ownSocketIO) {
      console.log("ownSocketIO is null");
      return;
    }
    if (!ownPeerId) {
      console.log("ownPeerId is null");
      return;
    }
    ownSocketIO.emit("create room", ownPeerId);
    console.log("from create room", ownPeerId);
  }
  function joinRoom() {
    ownSocketIO.emit("join room", joinRoomInputFieldValue, ownPeerId);
    console.log("joinroominputfieldvalue", joinRoomInputFieldValue);
  }

  function getHostAbility(){}
  
  function removeAudioTrack(){}
  function removeVideoTrack(){}
  function addVideoTrack(){}
  function addAudioTrack(){}
  async function shareScreen(){
    
    try{
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      || navigator.mozGetUserMedia;

      const shareStream = await navigator.mediaDevices.getDisplayMedia(
        {video: {cursor:'always'}, audio: false});

      let existingTracks = ownStream.getVideoTracks();
      let shareTracks = shareStream.getVideoTracks();
      let videoTrack = shareTracks[0];
      guestCallsStruct.forEach((gcall)=>{
        let sender = gcall.peerConnection.getSenders().find(function(s) {
          return s.track.kind == videoTrack.kind;
        });
        console.log('found sender:', sender);
        sender.replaceTrack(videoTrack);
      });



      existingTracks.forEach(track=>{
      ownStream.removeTrack(track);
        
      })
      console.log('existing tracks removed: ',existingTracks.length);
      shareStream.getVideoTracks().forEach(htrack=>{
        ownStream.addTrack(htrack);
      })
    }catch(e){console.log(e);}
  }
  function messageAll(){}
  function raiseHand(){}

  return (
    <div className="main-comp">
      <input
        type="text"
        ref={joinRoomInputField}
        value={joinRoomInputFieldValue}
        onChange={onInputChange}
      ></input>
      <br />
      <button onClick={joinRoom}>Join Room</button>
      <br />
      <button onClick={createRoom}>Create Room</button>
      <div>
        <div>Own Stream</div>
        {!hostStream ? (
          <div
            style={{
              width: "800px",
              height: "600px",
              position: "relative",
              backgroundColor: "red",
              zIndex: "1",
            }}
          >
            <VideoComp streamObj={ownStream} />
          </div>
        ) : null}
      </div>
      <div>
        <div>Host Stream</div>
        {hostStream ? (
          <div
            style={{
              width: "800px",
              height: "600px",
              position: "relative",
              backgroundColor: "red",
              zIndex: "1",
            }}
          >
            <VideoComp streamObj={hostStream} />
            <VideoAppBar share={shareScreen}/>
          </div>
        ) : null}
      </div>
      <div>Guests Streams</div>
      <div className="mini-guest-videos">
        
        {guestsStreams.map((stream) => {
          return <MiniVideoComp streamObj={stream} />;
        })}
      </div>
      
    </div>
  );
}

export default MainVideoComponent;
