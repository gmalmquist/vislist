function Callback() {
	this._data = 0;
	this._done = false;
	this._error = "";
	
	this._finish = function(data, error) {};
	this._success = function(data) {};
	this._failure = function(error) {};
}

Callback.prototype.callback = function(data, error) {
	if (error !== undefined && error.length == 0) {
		error = undefined;
	}
	
	this._data = data;
	this._error = error;
	this._done = true;
	
	if (error === undefined) {
		this._success(data);
	} else {
		this._failure(error);
	}
	this._finish(data, error);
};

Callback.prototype.finish = function(func) {
	this._finish = func;
	if (this._done) {
		func(this._data, this._error);
	}
	return this;
};

Callback.prototype.success = function(func) {
	this._success = func;
	if (this._done && this._error === undefined) {
		func(this._data);
	}
	return this;
};

Callback.prototype.failure = function(func) {
	this._failure = func;
	if (this._done && this._error !== undefined) {
		func(this._error);
	}
	return this;
};