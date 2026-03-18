const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Dummy users database
const usersFile = path.join(__dirname, 'data/users.json');

// Signup API
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    let users = JSON.parse(fs.readFileSync(usersFile));
    if(users.find(u => u.username === username)){
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, password, skills: [], projects: [] });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({ message: 'User created successfully' });
});

// Login API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    let users = JSON.parse(fs.readFileSync(usersFile));
    const user = users.find(u => u.username === username && u.password === password);
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', user });
});

// Get all users (for feed)
app.get('/api/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFile));
    res.json(users);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
