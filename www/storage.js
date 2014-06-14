/**
 * Useful utility functions for interacting with persistent storage. Mostly dummy methods for now.
 * */
var Storage = {'vars':{}};

/**
 * Initializes any db connections etc that storage needs. Called automatically by 'login' if it
 * needs to be.
 * */
Storage.setup = function() {
 // Until we do actual database stuff, I'm doing hacks.
  this.db = {};
  // User table indexed by username
  this.db['users'] = {
    'marie': {
      'id':1,
      'username':'marie',
      'password':'weeks',
      'fullname':'marie weeks',
    },
  };

  this.db['lists'] = {
    1: [
      {'id':'movies', 'name':'Movies', 'style':'movie'},
      {'id':'games', 'name':'Games', 'style':'game'},
      {'id':'food', 'name':'Food', 'style':'clear'},
    ],
  };

  var movies = [
    {'name':'Howe two train your drag on.', 'icon':''},
    {'name':'The Cat Returns a DVD', 'icon':''},
    {'name':'Howl at a Castle', 'icon':''},
  ];
  var games = [
    {'name':'Finally Fantasy X', 'icon':''},
    {'name':'F0-X', 'icon':''},
    {'name':'The Ledger of Zelda: Pro Accounting', 'icon':''},
  ];
  var food = [
    {'name':'Carrots', 'icon':''},
    {'name':'Nachos', 'icon':''},
    {'name':'Spam', 'icon':''},
    {'name':'Stuffed Bell Peppers', 'icon':''},
  ];

  this.db['items'] = {
    1: {
      'movies': movies,
      'games': games,
      'food': food,
    },
  };
};

/**
 * Attempts a login with the given username and password.
 * @returns A callback which invokes success if successful, and failure otherwise.
 * */
Storage.login = function(username, password) {
	var callback = new Callback();

  if (this.db === undefined) {
    this.setup();
  }

  // Completely simulated backend. Obviously we'd never want to do actual user credential validation
  // client-side, because that's terribly insecure.
  function respond() {
    if (!(username in Storage.db.users)) {
      callback.callback(null, "No user with that username exists.");
      return;
    }
    if (Storage.db.users[username].password !== password) {
      callback.callback(null, "Username and password do not match.");
      return;
    }

    Storage.vars.currentUser = Storage.db.users[username];
    callback.callback("Logged in successfully.");
  }

  // Simulate lag waiting for backend
  setTimeout(respond, 200);

	return callback;
};

/**
 * Fetches a the list of list ids for the logged in user.
 * @returns A callback which returns a list of ids if successful, or failure otherwise.
 * */
Storage.getListIds = function() {
	var callback = new Callback();

  function respond() {
    try {
      callback.callback(Storage.db.lists[Storage.vars.currentUser.id]);
    } catch (err) {
      callback.callback(null, err);
    }
  }

  // Simulate lag waiting for backend.
  setTimeout(respond, 200);

	return callback;
};

/**
 * Fetches the items the list contains.
 * @returns A callback that gets populated with the items.
 * */
Storage.getList = function(id) {
  var callback = new Callback();

  function respond() {
    try {
      callback.callback(Storage.db.items[Storage.vars.currentUser.id][id]);
    } catch (err) {
      callback.callback(null, err);
    }
  }

  // Simulate lag waiting for backend.
  setTimeout(respond, 200);

  return callback;
};