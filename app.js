var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const { connectToMongoDb } = require("./config/db");
const http = require("http");
const session = require("express-session");
const cors = require("cors");
const logMiddleware = require("./middlewares/logsMiddlewares.js");
const notteRoutes = require("./routes/notteRoute");

var app = express();

// --- Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors());

app.use(
  session({
    secret: "net secret pfe",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(logMiddleware);

// --- Routes API
app.use("/users", require("./routes/usersRouter"));
app.use("/", require("./routes/indexRouter"));
app.use("/os", require("./routes/osRouter"));
app.use("/clients", require("./routes/clientRoutes"));
app.use("/notifications", require("./routes/notificationRouter"));
app.use("/task", require("./routes/taskRoutes"));
app.use("/experiences", require("./routes/experienceRouter"));
app.use("/formations", require("./routes/formationRouter"));
app.use("/certifications", require("./routes/certificationRouter"));
app.use("/projets", require("./routes/projetRouter"));
app.use("/competences", require("./routes/competenceRouter"));
app.use("/specialites", require("./routes/specialiteRouter"));
app.use("/categorie-tasks", require("./routes/categorieTaskRouter"));
app.use("/subscriptions", require("./routes/subscriptionRouter"));
app.use("/comments", require("./routes/commentRouter"));
app.use("/freelancer", require("./routes/freelancerRoutes"));
app.use("/message", require("./routes/messageReelRoutes")); // ✅ Historique seulement
app.use("/old-message", require("./routes/messageRoutes"));
app.use("/roles", require("./routes/roleRouter"));
app.use("/note", require("./routes/noteRoutes"));
app.use("/notte", notteRoutes);


console.log("✅ Routes loaded");

// --- 404 + error handler
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// --- SOCKET.IO
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const Message = require("./models/messageReelModel");

let users = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Quand un user se connecte, on l’enregistre
  socket.on("register", ({ userId }) => {
    users[userId] = socket.id;
    socket.data.userId = userId;
    console.log("📌 Registered:", userId, "=>", socket.id);
  });

  // Messages temps réel + persistance
  socket.on("sendMessage", async (msg) => {
    try {
      console.log("📩 Nouveau message:", msg);

      // Sauvegarde MongoDB
      const newMessage = new Message(msg);
      await newMessage.save();

      // envoyer au destinataire
      const receiverSocket = users[msg.receiverId];
      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", newMessage);
      }

      // renvoyer aussi à l’expéditeur (confirmation)
      const senderSocket = users[msg.senderId];
      if (senderSocket) {
        io.to(senderSocket).emit("receiveMessage", newMessage);
      }
    } catch (err) {
      console.error("❌ Erreur socket saveMessage:", err);
    }
  });

  // Signaling WebRTC (appel vidéo)
  socket.on("callUser", ({ userToCall, signalData, from }) => {
    const receiverSocket = users[userToCall];
    if (receiverSocket) {
      io.to(receiverSocket).emit("incomingCall", { from, signal: signalData });
    }
  });

  socket.on("answerCall", ({ to, signal }) => {
    const callerSocket = users[to];
    if (callerSocket) io.to(callerSocket).emit("callAccepted", signal);
  });

  // Déconnexion
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    const { userId } = socket.data || {};
    if (userId && users[userId] === socket.id) {
      delete users[userId];
    }
  });
});

// --- Lancer serveur
server.listen(process.env.PORT || 5001, "0.0.0.0", async () => {
  await connectToMongoDb();
  console.log(`🚀 App is running on port ${process.env.PORT || 5001}`);
});
