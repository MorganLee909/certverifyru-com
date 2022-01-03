const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");

let app = express();

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/views`));

let mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let httpsServer = {};
if(process.env.NODE_ENV === "production"){
    httpsServer = https.createServer({
        key: fs.readFileSync("/etc/letsencrypt/live/certverifyru.com/privkey.pem", "utf8"),
        cert: fs.readFileSync("/etc/letsencrypt/live/certverifyru.com/fullchain.pem", "utf8")
    }, app);

    app.use((req, res, next)=>{
        if(req.secure === true){
            next();
        }else{
            res.redirect(`https://${req.headers.host}${req.url}`);
        }
    });
}

mongoose.connect("mongodb://127.0.0.1/covidcert", mongooseOptions);

app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
require("./routes.js")(app);

if(process.env.NODE_ENV === "production") httpsServer.listen(process.env.HTTPS_PORT);
app.listen(process.env.PORT);