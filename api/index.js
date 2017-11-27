let express = require('express');
let path = require('path');
let http = require('http');
let bp = require('body-parser');
let cors = require('cors');
let helmet = require('helmet');
let compression = require('compression');

let post = require('./routes/postings');
let user = require('./routes/users');

// Declare express
const app = express();

// Security stuff
app.use(compression());
app.use(helmet());

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/** API ROUTES **/
app.use('/post', post);
app.use('/users', user);
app.use("/api", (req, res) => {
	res.send("Hello world I am not broken");
	return;;
});

let port = process.env.PORT || '8080';
app.set('port', port);


// Run http server
http.createServer(app).listen(port, () => console.log(`Market API running on port: ${port}`));