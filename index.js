let http = require("http");
let express = require("express");
let app = express();
let server = http.createServer(app);
let { Server } = require("socket.io");
let cors = require("cors");
let {v4:uuidV4} = require('uuid');

let ServerDataStructure = new Map();


let io = new Server(server, {
  cors: { origin: "*", methods: ["POST", "GET"] },
});

io.on('connection',(socket)=>{

  console.log('client connected socket io');
  socket.on('create room',(clientPeerId)=>{
    let roomId = uuidV4();
    socket.join(roomId);
    console.log('room joined after creating by a client')
    ServerDataStructure.set(roomId,{hostPeerId:clientPeerId,guestsPeerIds:[]});
    socket.emit('room created',roomId);
    console.log('room created by peerID client: ',clientPeerId);
  });
  
  socket.on('join room',(joinRoomId,clientPeerId)=>{
    socket.join(joinRoomId);
    let {hostPeerId,guestsPeerIds}=ServerDataStructure.get(joinRoomId);
    console.log(`***${hostPeerId}`);
    console.log(`***${guestsPeerIds}`);
    let guestsPeerIdsCopy = guestsPeerIds.slice();
    guestsPeerIds.push(clientPeerId);
    ServerDataStructure.set(joinRoomId,{hostPeerId:hostPeerId,guestsPeerIds:guestsPeerIds});
    console.log('client joined to a room');
    console.log('before guests',guestsPeerIdsCopy);
    console.log('after guests',guestsPeerIds);

    socket.broadcast.to(joinRoomId).emit('user connected',clientPeerId);
    socket.emit('room joined',hostPeerId,guestsPeerIdsCopy);
    console.log('sending existing',guestsPeerIdsCopy)
    console.log('broadcasted');
  });

})



app.use(cors());
app.get("/", (req, res, next) => {
  res.send("mainPage");
});
app.use((err, req, res, next) => {
  console.log("error in server use:", err);
});

server.listen(3300, () => {
  console.log("server started at port: ", server.address().port);
});
