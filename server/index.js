const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Need in-built bodyParser to be used in middleware so that body can be retreived in POST/PUTs
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/greeting', (req, res) => {
    res.send(JSON.stringify({ greeting: `Hello ${req.body.name}!` }));
});

// Handle GET requests to /api route
app.get("/api/test", (req, res) => {
    res.json({ message: `Hello from server! on port ${PORT}` });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
