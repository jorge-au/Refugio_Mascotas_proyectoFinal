require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const server = express();

const PORT = process.env.PORT || 3000;

// static files
server.use(express.static(path.join(__dirname, '/public')));

// middleware
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Session
server.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret_key',
    resave: false,
    saveUninitialized: false,
}));


// Template engine
server.set('views', path.join(__dirname, '/src/views'));
server.set('view engine', 'ejs');

// Routes
server.use('', require('./src/routes/mainRoutes'));
server.use('/login', require('./src/routes/loginRoutes'));

// Error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    
    // Validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            message: err.message
        });
    }
    
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Authentication required'
        });
    }
    
    // Default error
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
server.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found'
    });
});

//Server startup
server.listen(PORT, (error) => {
    if (error) {
        console.error('Server startup error:', error);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});
