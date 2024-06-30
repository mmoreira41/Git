const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(cors({
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

server.use((req, res, next) => {
    if (req.method === 'POST') {
        const db = router.db;
        const hortalicas = db.get('hortalicas').value();
        let maxId = hortalicas.length > 0 ? Math.max(...hortalicas.map(f => parseInt(f.id))) : 0;
        req.body.id = (maxId + 1).toString();
    }
    next();
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running on port 3000');
});
