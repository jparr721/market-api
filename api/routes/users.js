let express = require('express');
let router = express.Router();
let firebase = require('../util/firebase');
let errorHandler = require('./util/errorHandler');

router.post('/create', (req, res) => {
	if (req.body.id) {
		firebase.createUser(req.body.id, req.body.name, req.body.email).then((snapshot) => {
			res.send({status: "OK"});
			return;
		}, (err) => {
			res.status(500).send(errorHandler.errorJSON(req.originalUrl, err, "Error creating user."));
			return;
		});
	} else {
		res.status(403).send(errorHandler.errorJSON(req.originalUrl, null, "No user id provided in json format."));
		return;
	}
});

router.get('/:id/exists', (req, res) => {
	firebase.exists(req.params.id).then((data) => {
		res.send({
			exists: data
		});
		return;
	}, (err) => {
		res.status(503).send(errorHandler.errorJSON(req.originalUrl, err, "Error connecting to server."));
		return;
	});
});
