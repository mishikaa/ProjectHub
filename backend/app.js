const express = require('express')
const colors = require('colors')

const Project = require('./models/Project'); // Assuming you have a Project model defined
const Task = require('./models/Task');
const Notification = require('./models/Notification');

const connectDb = require('./config/db');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const mongoose = require('mongoose');

const passport = require("passport");
const path = require("path");
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // Create an HTTP server instance
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 3000;

connectDb();

require("./models/User");
require("./models/Task");
require("./models/Project");


app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

connectDb();

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/projects", require("./routes/project"));
app.use("/tasks", require("./routes/tasks"));
app.use('/notifications', require('./routes/notifications'));
app.use('/api/performance', require('./routes/performance'));

// Socket.io integration
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.set('socketio', io);
      
// Catch-all handler to serve the React app for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan);
})