var exports = module.exports = {};
let admin = require('firebase-admin');
let service_acc = require('../auth/auth.json');

let app_config = admin.initializeApp({
	credential: admin.credential.cert(service_acc),
	databaseURL: "https://marketplace-7a251.firebaseio.com/"
});

exports.database = app_config.database();

exports.write = (url, json) => {
	return new Promise((resolve, reject) => {
		exports.database.ref(url).update(json).then((snapshot) => {
			resolve(snapshot);
		}, (err) => {
			reject(err);
		});
	});
};

exports.read = (url) => {
	return new Promise((resolve, reject) => {
		exports.database.ref(url).once('value').then((snapshot) => {
			resolve(snapshot.val());
		}, (err) => {
			reject(err);
		});
	});
};

exports.delete = (url) => {
	return new Promise((resolve, reject) => {
		exports.database.ref(url).once('value').then((snapshot) => {
			resolve(remove(snapshot.val());
		}, (err) => {
			reject(err);
		});
	});
};

exports.createUser = (uuid, name, email) => {
	return new Promise((resolve, reject) => {
		exports.database.ref('users/' + uuid).set({
			id: uuid,
			name: name,
			email: email
		}).then((snapshot) => {
			resolve(snapshot);
		}, (err) => {
			reject(err);
		});
	});
};

exports.exists = (uuid) => {
	return new Promise((resolve, reject) => {
		exports.database.ref('users/' + uuid).once('value').then((snapshot) => {
			if (snapshot.val() && (snapshot.val().name || snapshot.val().items)) {
				resolve(true);
			} else {
				resolve(false);
			}
		}, (err) => {
			reject(err);
		});
	});
};