const express = require("express");
const server = express();

// Configure your server here
server.use(express.json());
// Build your actions router in /api/actions/actions-router.js
server.use("/api/actions", require("./actions/actions-router"));
// Build your projects router in /api/projects/projects-router.js
server.use("/api/projects", require("./projects/projects-router"));

module.exports = server;
