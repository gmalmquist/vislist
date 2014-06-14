/**
 * Basically a unit test.
 * Name - name of test.
 * Run - function which performs the test.
 * */
function Test(name, run) {
  this.name = name;
  this._run = run;
}
Test.prototype.run = function() {
  try {
    if (this._run() === true) {
      return 'SUCCESS';
    }
    return 'FAILURE';
  } catch (err) {
    this.error(err);
    return 'ERRORED';
  }
};
Test.prototype.log = function(type, msg) {
  window.log(type, this.name + ": " + msg);
}
Test.prototype.error = function(msg) {
  this.log("ERROR", msg);
}
Test.prototype.warning = function(msg) {
  this.log("WARNING", msg);
}
Test.prototype.debug = function(msg) {
  this.log("DEBUG", msg);
}

/**
 * Runs all the tests.
 * */
function TestRunner() {
  this.name = 'ALL';
  this.tests = [
    new Test('Callback Success', function() {
      var callback = new Callback();
      var result = {'value':false};
      callback.success(function() { result.value = true; });
      callback.callback('Hi');
      return result.value;
    }),
    new Test('Callback Failure', function() {
      var callback = new Callback();
      var result = {'value':false};
      callback.failure(function() { result.value = true; });
      callback.callback(null, 'Hi');
      return result.value;
    }),
    new Test('Callback Success (1, undefined)', function() {
      var callback = new Callback();
      var result = {'value':false};
      callback.success(function() { result.value = true; });
      callback.callback(1, undefined);
      return result.value;
    }),
    new Test('Callback Success (1, null)', function() {
      var callback = new Callback();
      var result = {'value':false};
      callback.success(function() { result.value = true; });
      callback.callback(1, null);
      return result.value;
    }),
    new Test('Login Test', function() {
      var result = {'value':'waiting'};
      Storage.login('marie', 'weeks')
        .success(function(data) { result.value = true; })
        .failure(function(data) { result.value = false; });

      return result.value;
    }),
  ];
}
TestRunner.prototype.log = Test.prototype.log;

TestRunner.prototype.run = function() {
  var passed = 0;
  var failed = 0;
  var errored = 0;
  for (var i = 0; i < this.tests.length; i++) {
    var test = this.tests[i];
    var result = test.run();
    if (result === 'SUCCESS') passed++;
    if (result === 'FAILURE') failed++;
    if (result === 'ERRORED') errored++;
    test.log(result, 1);
  }

  this.log('RESULTS (' + this.tests.length + ')', 'Passed: ' + passed + ', Failed: ' + failed + ', Errored: ' + errored);
};