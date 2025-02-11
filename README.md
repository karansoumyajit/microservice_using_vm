# Microservice Deployment with VirtualBox and Puppy Linux

## Overview
This project demonstrates how to create and deploy a simple Node.js-based microservice across two Puppy Linux virtual machines using VirtualBox.

## Technologies Used
- **VirtualBox** (for creating and managing VMs)
- **Puppy Linux** (lightweight OS for VMs)
- **Node.js** (for building the microservice)
- **Express.js** (for handling HTTP requests)
- **NAT & Host-Only Networking** (for inter-VM communication)

## Microservice Code
```javascript
const express = require('express');
const app = express();

// Sample data
const students = [
    { id: 1, name: 'Soumyajit', stream: 'AID' },
    { id: 2, name: 'Adarsh', stream: 'AIR' },
    { id: 3, name: 'Abhishek', stream: 'CSE' },
    { id: 4, name: 'Biswarup', stream: 'AID' },
    { id: 5, name: 'Akash', stream: 'AIR' },
    { id: 6, name: 'Anirban', stream: 'AID' }
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
    console.log('Microservice running on all IPs on port', PORT);
});
```

## Steps to Run

### 1. Install VirtualBox
- Download VirtualBox from [Oracle’s website](https://www.virtualbox.org/)
- Run the installer and follow the setup wizard
- Install the VirtualBox Extension Pack

### 2. Create Virtual Machines
1. Open VirtualBox and create a new VM named `Puppy_Linux1`.
2. Select **Linux** as the type and **Other Linux (64-bit)** as the version.
3. Allocate **2048MB RAM** and **8GB of virtual hard disk**.
4. Attach the Puppy Linux ISO file and install the OS.
5. Repeat the process to create another VM named `Puppy_Linux2`.

### 3. Configure Networking
- `Puppy_Linux1`: **Host-only adapter** as Adapter 1.
- `Puppy_Linux2`: **NAT adapter** as Adapter 1 and **Host-only adapter** as Adapter 2.
- Disable firewall on both VMs for easier communication.

### 4. Install Node.js on `Puppy_Linux2`
```bash
wget https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz
tar -xf node-v18.16.0-linux-x64.tar.xz
mv node-v18.16.0-linux-x64 /usr/local/nodejs

# Add Node.js to PATH
echo 'export PATH=/usr/local/nodejs/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Verify installation
node -v
npm -v
```

### 5. Deploy the Microservice
1. Create a project directory:
   ```bash
   mkdir microservice && cd microservice
   ```
2. Initialize Node.js:
   ```bash
   npm init -y
   ```
3. Install Express.js:
   ```bash
   npm install express
   ```
4. Create `server.js` and add the provided code.
5. Start the server:
   ```bash
   node server.js
   ```

### 6. Test the Microservice
Run the following commands from `Puppy_Linux1` to test:
```bash
curl -X GET http://192.168.1.102:5000/
curl -X GET http://192.168.1.102:5000/students
curl -X GET http://192.168.1.102:5000/students/1
```

## Conclusion
This setup successfully demonstrates hosting a microservice in a VirtualBox environment using Puppy Linux. The client VM (`Puppy_Linux1`) can access the microservice hosted on the server VM (`Puppy_Linux2`).

## Author
Soumyajit Karan

