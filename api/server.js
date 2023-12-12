const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

// Configure your server here
server.use(express.json());

// Build your actions router in /api/actions/actions-router.js
server.use('/api/actions', actionsRouter);

// Build your projects router in /api/projects/projects-router.js
server.use('/api/projects', projectsRouter);

module.exports = server;
