process.env.TZ = "Europe/London"
const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');
filePath = path.join(__dirname, 'texts.txt')

const http = require("http");
const server = http.Server(app);

const sockets = require("socket.io");
io = sockets(server, {cors: {
    origin: "https://web-client.xangil.repl.co",
    methods: ["GET", "POST"]
  }});

io.on("connection", function (connection) {
  connection.on("message", function (data) {
    let today = new Date();
    console.log(today + data);
    io.emit("broadcast", data);
    fs.readFile('texts.txt', 'utf8', (err, fileread) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
      let old_data = fileread;
      fs.writeFileSync('texts.txt', old_data + "\n\n" + today + "\n" + data);
    });
  });
});

server.listen(3000, function () {
  console.log("listening on 3000");
});