'use strict';

const express = require('express');
const cors = require('cors');

// Import error handlers and middleware
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

// Import routes
const v1Routes = require('./routes/v1.js');
const authRoutes = require('./auth/routes.js');

// Create express app instance
const app = express();

// Use built-in middleware to parse JSON request bodies
app.use(express.json());

// Use custom middleware to log incoming requests
app.use(logger);

// Enable Cross-Origin Resource Sharing (CORS) to allow cross-domain requests
app.use(cors());

// Use built-in middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use(authRoutes); // Authentication routes
app.use('/api/v1', v1Routes); // Version 1 API routes

// Handle 404 errors for all undefined routes
app.use('*', notFoundHandler);

// Handle all errors thrown in the application
app.use(errorHandler);

// Export the app instance and a function to start the server on a specified port
module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
