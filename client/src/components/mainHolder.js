import react, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import reactDom from "react-dom";
import { io } from "socket.io-client";
import { VideoComp } from "./videoComp";
import VideoAppBar from "./video_app_bar";
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

  useEffect(() => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      setOwnStream(stream);
    });
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
      hostCall.on("stream", (remoteStream) => {
        setHostStream(remoteStream);
        console.log("set host stream", remoteStream);
      });

      guestsCopy.forEach((element) => {
        let guestCall = ownPeer.call(element, ownStream);
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
      console.log("call received by peer id: ", call.peer);
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

  return (
    <div>
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
        {!hostStream ? <VideoComp streamObj={ownStream} /> : null}
      </div>
      <div>
        <div>Host Stream</div>
        {hostStream ? (
          <div style={{width:"800px",height:"600px",position:"relative",backgroundColor:'red',zIndex:"1"}}>
            <VideoComp streamObj={hostStream} />
            <VideoAppBar />
          </div>
        ) : null}
      </div>
      <div>
        <div>Guests Streams</div>
        {guestsStreams.map((stream) => {
          return <VideoComp streamObj={stream} />;
        })}
      </div>
      <button
        onClick={() => {
          guestsStreams.map((stream) => {
            console.log(stream.id);
          });
          console.log("host stream", hostStream.id);
        }}
      >
        get guest streams
      </button>
    </div>
  );
}

export default MainVideoComponent;
