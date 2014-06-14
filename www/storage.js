/**
 * Useful utility functions for interacting with persistent storage. Mostly dummy methods for now.
 * */
var Storage = {};

/**
 * Attempts a login with the given username and password.
 * @returns A callback which invokes success if successful, and failure otherwise.
 * */
Storage.login = function(username, password) {
	var callback = new Callback();
	callback.callback({'msg':'logged in successfully.'});
	return callback;
};

/**
 * Fetches a the list of list ids for the logged in user.
 * @returns A callback which returns a list of ids if successful, or failure otherwise.
 * */
Storage.getListIds = function() {
	var callback = new Callback();
	callback.callback(['movies', 'games', 'food',]);
	return callback;
};