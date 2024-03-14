import express from 'express';
import { data } from './static.js';
const PORT = process.env.PORT || 3000;
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.get('/', (req, res) => {
    res.send(JSON.stringify({
        message: 'Hello World',
        data: data,
    }));
});
app.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Extract integer param
    const requestedItem = data.find((item) => item.id === id);
    if (!requestedItem) {
        res.status(404).send('Item not found');
    }
    const { label, description } = req.query;
    const itemIndex = data.findIndex((item) => item.id === id);
    data[itemIndex] = {
        ...requestedItem,
        label,
        description,
    };
    res.send(JSON.stringify({
        message: 'Item updated',
        data: data[itemIndex],
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