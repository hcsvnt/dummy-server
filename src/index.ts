// build a simple server
import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

// reply with html
app.get('/hello', (req, res) => {
    const name = req.query.name || 'World';
    res.send(`<h1>Hello ${name}</h1>`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
