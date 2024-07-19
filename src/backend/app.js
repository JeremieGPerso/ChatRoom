const express = require('express');
const WebSocket = require("ws");
const URL = require("url");

const loginRoutes = require('./routes/login');
const membersController = require("./routes/members");
const conversationsRoutes = require("./routes/conversations");

const conversationsController = require("./controllers/conversationsController");

const app = express();

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// WebSocket event handling
wss.on('connection', (ws, req) => {
  ws.id = URL.parse(req.url, true).query.userId;
  console.log('A new client connected:', ws.id);

  // Event listener for incoming messages
  ws.on('message', (messageDTO) => {
    console.log('Received message:', messageDTO.toString());

    // add sender to the message
    const dtoObject = JSON.parse(messageDTO.toString());
    dtoObject.sender = ws.id;
    
    const messageObject = {
      sender: ws.id,
      content: dtoObject.content,
      timestamp: dtoObject.timestamp,
    };
    const chatId = dtoObject.chatId;

    // Add message in conversation
    const membersOfConversation = conversationsController.addMessage(chatId, messageObject);
    // Broadcast the message to all connected members
    wss.clients.forEach((client) => {
      if (membersOfConversation.includes(client.id) && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(dtoObject));
      }
    });
  });

  // Event listener for client disconnection
  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/status', (req, res) => res.status(200).json({ status: 'UP' }));

app.use('/api/auth', loginRoutes);

app.use('/api/members', membersController);

app.use("/api/conversations", conversationsRoutes);

module.exports = app;
