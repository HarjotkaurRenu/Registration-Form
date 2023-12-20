// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define MongoDB Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.send('Error registering user.');
        } else {
            res.send('User registered successfully.');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
