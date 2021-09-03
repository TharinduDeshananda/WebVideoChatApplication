let http = require("http");
let express = require("express");

let mongoose = require("mongoose");
let app = express();
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let Session = require("express-session");
let Passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let server = http.createServer(app);
let { Server } = require("socket.io");
let cors = require("cors");
let { v4: uuidV4 } = require("uuid");
let User = require("./Models/User");
let Room = require("./Models/Room");
const { GuestUser } = require("./Models/GuestUser");
const EmailTemplate = require("./Models/emailTemplate");

let ServerDataStructure = new Map();

let io = new Server(server, {
  cors: { origin: "*", methods: ["POST", "GET"] },
});

io.on("connection", (socket) => {
  console.log("client connected socket io");
  socket.on("create room", (clientPeerId) => {
    let roomId = uuidV4();
    socket.join(roomId);
    console.log("room joined after creating by a client");
    ServerDataStructure.set(roomId, {
      hostPeerId: clientPeerId,
      guestsPeerIds: [],
    });
    socket.emit("room created", roomId);
    console.log("room created by peerID client: ", clientPeerId);
  });

  socket.on("join room", (joinRoomId, clientPeerId) => {
    socket.join(joinRoomId);
    let { hostPeerId, guestsPeerIds } = ServerDataStructure.get(joinRoomId);
    console.log(`***${hostPeerId}`);
    console.log(`***${guestsPeerIds}`);
    let guestsPeerIdsCopy = guestsPeerIds.slice();
    guestsPeerIds.push(clientPeerId);
    ServerDataStructure.set(joinRoomId, {
      hostPeerId: hostPeerId,
      guestsPeerIds: guestsPeerIds,
    });
    console.log("client joined to a room");
    console.log("before guests", guestsPeerIdsCopy);
    console.log("after guests", guestsPeerIds);

    socket.broadcast.to(joinRoomId).emit("user connected", clientPeerId);
    socket.emit("room joined", hostPeerId, guestsPeerIdsCopy, joinRoomId);
    console.log("sending existing", guestsPeerIdsCopy);
    console.log("broadcasted");
  });

  socket.on("need hosting", (ownPeerId, roomID) => {
    console.log("need hosting received", roomID);
    socket.broadcast.to(roomID).emit("hosting asked", ownPeerId);
  });
});

Passport.serializeUser((user, done) => {
  done(null, user.id);
  console.log("user serialized");
});

Passport.deserializeUser(async (userId, done) => {
  try {
    let user = await Room.findById(userId);
    if (!user) {
      console.log("erro 1");
      done(new Error("user not found"), false);
      return;
    }
    done(null, user);
  } catch (e) {
    console.log("err deserializing,", e);
    done(e, null);
  }
});

Passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("fetching info of user:", username);
      let user = await User.findOne({ userName: username });
      if (!user) {
        console.log("error 2 no user found");
        done(null, false, null);
        return;
      }
      done(null, user, null);
    } catch (e) {
      console.log("error 2 error fetching user");
      done(e, null, { message: "error fetching user" });
    }
  })
);

app.use("/static", express.static("public"));
app.use(cookieParser("ss", {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Session({ secret: "ss", resave: true, saveUninitialized: true }));
app.use(Passport.initialize());
app.use(Passport.session());

app.use(cors());
app.use((req, res, next) => {
  
  console.log(req.isAuthenticated());
  next();
});

app
  .get("/", (req, res, next) => {
    res.send("mainPage");
  })
  .post("/authenticate", async (req, res, next) => {
    console.log("authentication started");
    Passport.authenticate("local", (err, user, info) => {
      if (err || !user) {
        console.log(err, "||");
        res.send({ message: "no user", done: false });
        return;
      }

      req.logIn(user, async (err) => {
        if (err) {
          res.send({ message: "login failed inside req login", done: false });
          return;
        }
        console.log("logged in user is: ", user);

        user = await User.populate(user, { path: "rooms", model: "Room" });
        console.log("this is user", user);
        res.send({ done: true, user: user });
      });
    })(req, res, next);
  });
app
  .use(async (err, req, res, next) => {
    console.log("error in server use:", err);
  })

  .post("/createRoom", async (req, res, next) => {
    try {
      let obj = await req.body;
      console.log(obj);
      let user = await User.findById(obj.userId);
      let room = new Room({
        roomName: obj.roomName,
        roomDescription: obj.roomDescription,
        hostUser: new mongoose.Types.ObjectId(user._id),
        users: [],
      });
      room = await room.save();
      user.rooms.push(room._id);
      await user.save();
      res.send({ done: true, room: room });
      console.log("creating a room is done", room._id);
      console.log("room is: ", room);
    } catch (e) {
      console.log(e);
      res.send({ done: false, room: null });
    }
  })

  .post("/postTemplate", async (req, res, next) => {
    try{
      let body = await req.body;
    
    let eTemplate = new EmailTemplate({...body});
    await eTemplate.save();
    let userTemplates = await EmailTemplate.find({userId:body.userId});
    
    res.send({ done: true, templates: [...userTemplates] });

    }catch(e){res.send({done:false})}
  })

  .post('/getTemplates',async (req,res,next)=>{
    try{
      
      let body = await req.body;
      let eTemplates = await EmailTemplate.find({userId:body.userId});
      
      res.send({done:true,templates:[...eTemplates]});

    }catch(e){
      res.send({done:false});
    }

  })
  .post("/updateRoom", async (req, res, next) => {
    try {
      let body = await req.body;

      let userId = body.userId;
      let newUsers = body.newUsers;
      let roomId = body.roomId;
      let roomName = body.roomName;
      let roomDescription = body.roomDescription;

      let newUsersMapped = newUsers.map((user) => {
        return new GuestUser({
          guestName: user.guestName,
          guestEmail: user.guestEmail,
        });
      });

      let room = await Room.findById(roomId);
      room.roomName = roomName;
      room.roomDescription = roomDescription;
      room.users.push(...newUsersMapped);
      room = await room.save();

      console.log("update room done: ", room.users);
      console.log(",****");
      console.log(newUsers);
      res.send({
        done: true,
        guestUsers: [...room.users],
        roomName: roomName,
        roomDescription: roomDescription,
        roomId: roomId,
      });
    } catch (e) {
      console.log(e);
      res.send({ done: false });
    }
  })

  .post('/sendMail',(req,res,next)=>{
    let body = await req.body;
    
    res.send({done:true});
  })

  .post("/removeRoom", async (req, res, next) => {
    try {
      let body = await req.body;
      let userId = body.userId;
      let roomId = body.roomId;

      let user = await User.findById(userId);
      user.rooms.remove(roomId);

      user = await user.save();

      await Room.deleteMany({ _id: roomId });
      let rooms = await Room.find({ hostUser: userId });
      res.send({ done: true, user: user, rooms: rooms });

      console.log("done removing room");
      console.log("rooms: ", rooms);
    } catch (e) {
      console.log(e);
      res.send({ done: false });
    }
  })

  .post("/signup", async (req, res, next) => {
    let body = await req.body;
    let user = new User({
      userName: body.username,
      password: body.password,
      email: body.email,
    });
    user = await user.save();
    console.log("acc body", body);
    console.log(user);
    res.send({ done: true, user: user });
    try {
    } catch (e) {
      console.log("user save failed");
      res.send({ done: false });
    }
  });

mongoose
  .connect("mongodb://localhost:27017/chatapp")
  .then(() => {
    console.log("connection to mongodb established", { useNewUrlParser: true });
    server.listen(3300, () => {
      console.log("server started at port: ", server.address().port);
    });
  })
  .catch((err) => {
    console.log("error connecting to mongodb");
  });
