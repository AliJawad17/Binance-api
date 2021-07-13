const express = require('express');
const cors = require('cors');
const path = require('path');

const expressLayoutes = require('express-ejs-layouts');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/customerRoutes');
const confRoutes = require('./routes/confRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tickerRoutes = require('./routes/tickerRoutes');
const app = express();
const port = 3000;
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
var server = require('http').Server(app);
// var io = require('socket.io')(server);


// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
require('./startup/db')();
require('./startup/logging')();


app.use(expressLayoutes);
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));





// io.on('connection', (sock)=>{
  
//   console.log('new user connected', sock);

// })

// const io = require('socket.io')(server);

app.use(customerRoutes.routes);
app.use(confRoutes.routes);
app.use(orderRoutes.routes);
app.use(tickerRoutes.routes);
const io = require("socket.io")(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling'],
      credentials: true
  },
  allowEIO3: true
});
// require('./controllers/tickerController.js')(io);
io.on("connection", socket => {
  console.log('socket id', socket.id);
  // either with send()
  socket.send("Hello! PAKISTAN");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on("message", (data) => {
    console.log(data);
  });

  // handle the event sent with socket.emit()
  socket.on("salutations", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
  socket.on("disconnect", () => {
    console.log('disconnect',socket.id); // undefined
  });
});

// io.on("connection", (socket)=> {
//   console.log('a user connected',socket);
//   // socket.on('chat message', function(msg){
//   //     console.log('message: ' + msg);
//   //   });
//   // socket.on("connect", (obj) => {
//   //   socketHander.storeMessages(obj);
//   //   io.emit("message", obj);
//   // });
// })

// server = app.listen(port);
server.listen(port, function(){
  console.log('app running on port :',port);
});

module.exports.io = io;
module.exports.server = server;
// module.exports.app = app;