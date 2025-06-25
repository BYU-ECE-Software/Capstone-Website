const app = require('./app');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001; // this will of course need to be changed (well maybe not) once we get test and live servers going

// Serve files in /assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});