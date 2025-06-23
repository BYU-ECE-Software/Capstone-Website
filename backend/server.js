const app = require('./app');

const PORT = process.env.PORT || 3000; // this will of course need to be changed (well maybe not) once we get test and live servers going

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});