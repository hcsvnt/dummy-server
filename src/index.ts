import express from 'express';
import { DATA } from './static.js';

// THE DATABASE STONKS
let database = [...DATA];

const PORT = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.get('/', (req, res) => {
    res.send({ message: 'Hello World', data: database });
});

app.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Extract integer param

    const requestedItem = database.find((item) => item.id === id);

    if (!requestedItem) {
        res.status(404).send('Item not found');
    }

    const data = req.body;
    const { label, description } = data;

    const itemIndex = data.findIndex((item) => item.id === id);

    const newItem = {
        ...requestedItem,
        label: label || requestedItem.label,
        description: description || requestedItem.description,
    };
    const newData = data.splice(itemIndex, 1, newItem);
    database = newData;

    res.send({
        message: 'Item updated',
        data: newItem,
    });
});

// reply with html
app.get('/hello', (req, res) => {
    const name = req.query.name || 'World';
    res.send(`<h1>Hello ${name}</h1>`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
