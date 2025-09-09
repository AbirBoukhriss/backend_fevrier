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
const Message = require("./models/messageSchema"); // ✅ importer le modèle Message correctement

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
app.use("/messages", require("./routes/messageRoutes"));

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

const users = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("✅ Socket connecté :", socket.id);

  // --- Enregistrement user
  socket.on("register", async ({ userId }) => {
    users[userId] = socket.id;
    socket.data.userId = userId;
    console.log("👤 Register :", userId, "=>", socket.id);
    console.log("🟢 Users connectés :", users);

    // --- Envoyer les messages non délivrés
    try {
      const pending = await Message.find({ receiverId: userId, delivered: false });
      console.log(`📥 Messages non délivrés pour ${userId} :`, pending.length);
      pending.forEach(async (msg) => {
        io.to(socket.id).emit("receiveMessage", msg);
        msg.delivered = true;
        await msg.save();
        console.log("📤 Message délivré :", msg._id, "à", userId);
      });
    } catch (err) {
      console.error("❌ Erreur récupération messages non délivrés:", err);
    }
  });

  // --- Envoi d'un message
  socket.on("sendMessage", async (data) => {
    console.log("📩 Nouveau message :", data);
    console.log("🟢 Users connectés :", users);

    try {
      const newMsg = new Message({
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
        delivered: false,
        timestamp: new Date(),
      });
      await newMsg.save();
      console.log("💾 Message sauvegardé :", newMsg._id);

      const receiverSocketId = users[data.receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", newMsg);
        newMsg.delivered = true;
        await newMsg.save();
        console.log(`📨 Message envoyé en direct à ${data.receiverId}`);
      } else {
        console.log("⚠ Receiver pas connecté:", data.receiverId);
      }

      // --- Mise à jour côté sender
      io.to(socket.id).emit("receiveMessage", newMsg);
    } catch (err) {
      console.error("❌ Erreur envoi message:", err);
    }
  });

  // --- Déconnexion
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    for (let userId in users) {
      if (users[userId] === socket.id) delete users[userId];
    }
    console.log("🟢 Users restants :", users);
  });


  // Déconnexion
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    for (let userId in users) {
      if (users[userId] === socket.id) delete users[userId];
    }
  });
});

// --- Lancer serveur
server.listen(process.env.PORT || 5001, "0.0.0.0", async () => {
  await connectToMongoDb();
  console.log(`🚀 App is running on port ${process.env.PORT || 5001}`);
});
