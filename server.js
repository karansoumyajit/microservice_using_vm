const express = require('express');
const app = express();

// Sample data
const students = [
    { id: 1, name: 'Soumyajit', stream: 'AID' },
    { id: 2, name: 'Adarsh', stream: 'AIR' },
    { id: 3, name: 'Abhishek', stream: 'CSE' },
    { id: 4, name: 'Biswarup', stream: 'AID' }
	{ id: 5, name: 'Akash', stream: 'AIR' }
	{ id: 5, name: 'Anirban', stream: 'AID' }
];

// Root endpoint
app.get('/', (req, res) => res.send('Welcome! You have successfully connected to the Puppy_linux2 VM Microservice!'));

// Fetching all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Fetching a specific Student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(u => u.id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('Microservice running in all IPs on port', PORT);
});
