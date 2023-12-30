const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.resolve("./public")))

//socket handling
io.on('connection',(socket)=>{
    socket.on('user-message',(message)=>{
        console.log(message);
        io.emit('message',message);
    })
})

//normal server handling
app.get('/manik',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

server.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})