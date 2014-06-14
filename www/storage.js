var Storage = {};

Storage.login = function(username, password) {
	var callback = new Callback();
	callback.callback({'msg':'logged in successfully.'});
	return callback;
};

Storage.getListIds = function() {
	var callback = new Callback();
	callback.callback(['movies', 'games', 'food',]);
	return callback;
};