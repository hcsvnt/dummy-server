// build a simple server
import express from 'express';
import { data } from './static.js';
const PORT = process.env.PORT || 3000;
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    next();
});
app.get('/', (req, res) => {
    res.send(JSON.stringify({
        message: 'Hello World',
        data: data,
    }));
});
// reply with html
app.get('/hello', (req, res) => {
    const name = req.query.name || 'World';
    res.send(`<h1>Hello ${name}</h1>`);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map