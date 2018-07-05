const express = require('express'),
    app = express(),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    http = require('http'),
    chalk = require('chalk'),
    cors = require('cors');


app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: false
}));
app.use(bodyParser.text());

app.get('/product-listing-api', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader('charset', 'utf-8');
    if (req.query.file === "productTilesData") {
        let readStream = fs.createReadStream(path.resolve(__dirname, './public/data/productTilesData.json'));

        readStream.pipe(res);

        readStream.on('error', err => res.end(err));
        readStream.on('close', () => res.end());
    } else if (req.query.file === "productTileKeys") {
        let readStream = fs.createReadStream(path.resolve(__dirname, './public/data/productTileKeys.json'));

        readStream.pipe(res);

        readStream.on('error', err => res.end(err));
        readStream.on('close', () => res.end());
    }

});


http.createServer(app).listen(8990);


console.log(chalk.green('========================================================'));
console.log(chalk.green(`http://localhost:8990`));

