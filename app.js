var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const { connectToMongoDb } = require("./config/db");
const http = require('http');
const session = require('express-session'); 
const cors = require("cors"); // <== Ajouté ici
const logMiddleware = require('./middlewares/logsMiddlewares.js'); //log

var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var osRouter = require('./routes/osRouter');
const clientRoutes = require("./routes/clientRoutes");

// Importation de toutes les routes des entités
const notificationRoutes = require("./routes/notificationRouter");
const experienceRoutes = require("./routes/experienceRouter");
const formationRoutes = require("./routes/formationRouter");
const certificationRoutes = require("./routes/certificationRouter");
const projetRoutes = require("./routes/projetRouter");
const competenceRoutes = require("./routes/competenceRouter");
const specialiteRoutes = require("./routes/specialiteRouter");
const categorieTaskRoutes = require("./routes/categorieTaskRouter");
const subscriptionRoutes = require("./routes/subscriptionRouter");
const commentRoutes = require("./routes/commentRouter");
const freelancerRoutes = require("./routes/freelancerRoutes");
const messageRoutes = require("./routes/messageRoutes");
const noteRoutes = require("./routes/noteRoutes");
const taskRoutes = require("./routes/taskRoutes");
const roleRoutes = require("./routes/roleRouter");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logMiddleware)  //log

app.use(cors({
origins: "http://localhost:3000", 
methods: "GET, POST, PUT, DELETE",
}))
app.use(session({   //cobfig session
  secret: "net secret pfe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: {secure: false},
    maxAge: 24*60*60,
  
  },  
}))

// Routes principales
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use("/clients", clientRoutes);

// Ajout des routes personnalisées
app.use("/notifications", notificationRoutes);
app.use("/task", taskRoutes);
app.use("/experiences", experienceRoutes);
app.use("/formations", formationRoutes);
app.use("/certifications", certificationRoutes);
app.use("/projets", projetRoutes);
app.use("/competences", competenceRoutes);
app.use("/specialites", specialiteRoutes);
app.use("/categorie-tasks", categorieTaskRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/comments", commentRoutes);
app.use("/freelancer", freelancerRoutes);
app.use("/message", messageRoutes);
app.use("/roles", roleRoutes);
app.use("/note", noteRoutes);

console.log("Comment routes loaded");

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Démarrage du serveur HTTP
const server = http.createServer(app);
server.listen(process.env.PORT || 5001, () => {
  connectToMongoDb();
  console.log(`App is running on port ${process.env.PORT || 5001}`);
});
