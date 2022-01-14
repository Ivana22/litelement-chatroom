const jsonServer = require('json-server');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const wss = new WebSocket.Server({port: 3030});

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  // For every POST request, a `created_at` property is added
  if (req.method === 'POST') {
    req.body.id = uuidv4();
    req.body.created_at = new Date().toISOString();
    if(req.body.message){
      req.body.event = "created"
    }
  }

  if (req.body && req.body.room_id) {
    wss.clients.forEach((client) => client.send(JSON.stringify(req.body)));
  }
  next();
});

// Use default router
server.use(router);
server.listen(3000, () => console.log('Server is running'));

wss.on('connection', (ws) =>
  ws.on('message', (data) => wss.clients.forEach((client) => client.send(data)))
);
