/**
 * Class to deal with returning values asynchronously. Typically returned by the utility functions
 * in Storage. Callbacks can be defined with the finish, success, and failure methods, which each
 * take in a function to be called when whatever operation behind the callback finishes.
 * */
function Callback() {
	this._data = null;
	this._done = false;
	this._error = "";

	this._finish = function(data, error) {};
	this._success = function(data) {};
	this._failure = function(error) {};
}

/**
 * Returns true if the callback completed with an error message.
 * */
Callback.prototype.hasError = function() {
	if (!this._done) {
		return false;
	}
	return (this._error !== undefined) && (this._error !== null);
};

/**
 * Called (usually) by the function which created this callback in the first place, to notify it
 * that the operating this callback was waiting on completed. Callback forwards this message to the
 * user-defined finish, success, and failure methods as appropriate. The success callback is invoked
 * iff 'error' is undefined, otherwise the failure callback is invoked. Finish is invoked no matter
 * what.
 * */
Callback.prototype.callback = function(data, error) {
	if (error !== undefined && error.length == 0) {
		error = undefined;
	}

	this._data = data;
	this._error = error;
	this._done = true;

	if (!this.hasError()) {
		this._success(data);
	} else {
		this._failure(error);
	}
	this._finish(data, error);
};

/**
 * @param func - the 'finish' function that will be called when the operation completes. The finish
 *        function must accept two parameters: data, error. (error will only be set if the operation
 *        fails).
 * */
Callback.prototype.finish = function(func) {
	this._finish = func;
	if (this._done) {
		func(this._data, this._error);
	}
	return this;
};

/**
 * @param func - the 'success' function that will be called when the operation completes, if it is
 *        successful. The function must accept one parameter: data (basically, this is the return
 *        value).
 * */
Callback.prototype.success = function(func) {
	this._success = func;
	if (this._done && !this.hasError()) {
		func(this._data);
	}
	return this;
};

/**
 * @param func - the 'failure' functoin that will be called when the operation completes, if it
 *        returns an error. The function must accept one parameter: error (the error message).
 * */
Callback.prototype.failure = function(func) {
	this._failure = func;
	if (this._done && this.hasError()) {
		func(this._error);
	}
	return this;
};