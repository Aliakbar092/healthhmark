require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http'); // For creating HTTP server
const { Server } = require('socket.io'); // Import Socket.IO
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Models
const seller = require('./models/sellermodel');
const doctor = require('./models/doctormodel');
const user = require('./models/usermodel');
const admin = require('./models/adminmodel');
const animals = require('./models/animalmodel');
const Category = require('./models/categorymodel');
const cart = require('./models/cartmodel');

// Middleware
const checkAdmin = require('./middleware/checkAdmin');
const checkUser = require('./middleware/checkuser');

const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.IO
const io = new Server(server); // Initialize Socket.IO on the server

// Configure sessions
app.use(session({
  secret: '890',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost/Mydatabase',
    ttl: 30,
  }),
  cookie: {
    secure: false,
    maxAge: 1230000, // 20 minutes
  },
}));

// app.js or server.js
// app.js or server.js
// Middleware to set user data
app.use((req, res, next) => {
  if (req.session.admin) {
    res.locals.user = req.session.admin; // Contains name and role
  } else if (req.session.seller) {
    res.locals.user = req.session.seller;
  } else if (req.session.doctor) {
    res.locals.user = req.session.doctor;
  } else if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null;
  }
  next();
});




// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware setup
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import and use routers
const sellerRouter = require('./router/sellerrouter');
const doctorRouter = require('./router/doctorrouter');
const userRouter = require('./router/userrouter');
const adminRouter = require('./router/adminrouter');
const animalRouter = require('./router/animalsrouter');
const searchRouter = require('./router/searchrouter');
const fodderRouter = require('./router/fodderrouter');
const orderRouter = require('./router/orderrouter');

app.use('/', sellerRouter);
app.use('/', doctorRouter);
app.use('/', userRouter);
app.use('/', adminRouter);
app.use('/', animalRouter);
app.use('/', searchRouter);
app.use('/', fodderRouter);
app.use('/', orderRouter);

const chatRouter = require('./router/chatrouter');
app.use('/chat', chatRouter);


// Socket.IO setup for real-time chat
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for joining a specific chat room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for chat messages and broadcast to the room
  socket.on('chat-message', (data) => {
    io.to(data.roomId).emit('chat-message', data); // Broadcast to everyone in the room
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
