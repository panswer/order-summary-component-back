const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const envPath = path.resolve(__dirname, './.env');
if (fs.existsSync(envPath)) {
    dotenv.config({
        path: envPath
    });
}

const app = require('./server/app');

app.use(cors());
app.use(morgan('dev'));

const staticFiles = path.resolve(__dirname, './www');
if (!fs.existsSync(staticFiles)) {
    console.log("The static folder don't found");
    process.exit(1);
} else {
    app.use(express.static(staticFiles));
}

app.get('/*', (req, res) => {
    const pathIndex = path.resolve(staticFiles, 'index.html');

    res.sendFile(pathIndex);
});

const port = process.env.PORT || 3001;
app.listen(
    port,
    err => err ?
        console.log(err) :
        console.log(`Server on ${port}`)
);