let express = require('express');
let router = express.Router();
let firebase = require('../util/firebase');
let errorHandler = require('../util/errorHandler');

router.post('/create', (req, res) => {
	if (req.body.post_id && req.body.user_id) {
		firebase.write('users/' + req.body.user_id + '/postings/' + req.body.post_id, {
			id: req.body.post_id,
			title: req.body.title,
			price: req.body.price,
			user: req.body.user_id,
			description: req.body.description
		}).then((snapshot) => {
			res.send({status: "OK", data: snapshot});
			return;
		}, (err) => {
			res.status(500).send(errorHandler.errorJSON(req.originalUrl, null, "Error creating post."));
			return;
		});
	} else {
		res.status(403).send(errorHandler.errorJSON(req.originalUrl, null, "Invalid POST parameters."));
		return;
	}
});

router.get('/test', (rew, res) => {
	res.send('I am functional');
})

router.post('/:post_id', (req, res) => {
	firebase.read('posts/' + req.params.post_id).then((data) => {
		res.send(data);
		return;
	}, (err) => {
		res.status(503).send(errorHandler.errorJSON(req.originalUrl, err, "Error connecting to server."));
		return;
	});
});

router.get('/:post_id', (req, res) => {
	firebase.read('posts/' + req.params.post_id).then((data) => {
		res.send(data);
		return;
	}, (err) => {
		res.status(503).send(errorHandler.errorJSON(req.originalUrl, err, "Error connecting to server."));
		return;
	});
});

router.delete('/:post_id', (req, res) => {
	firebase.delete('posts/' + req.params.post_id).then((data) => {
		res.send(data);
		return;
	}, (err) => {
		res.status(503).send(errorHandler.errorJSON(req.originalUrl, err, "Error connecting to server."));
		return;
	});
});

module.exports = router;