const jsonServer = require('json-server');
const { v4: uuidv4 } = require('uuid');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Gera um UUID para cada novo livro
server.post('/livros', (req, res, next) => {
  req.body.id = uuidv4();
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log('Servidor JSON rodando em http://localhost:3000');
});
