var exports = module.exports = {};

exports.errorJSON = (url, err, msg) => {
	msg = (typeof msg !== 'undefined') ? msg : 'Internal Server Error. Fack off m8';
	return {
		url: url,
		error: err,
		message: msg,
	};
};