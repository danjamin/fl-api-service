/* global fl, module, test, asyncTest, start, ok, equal, sinon, JSON */

var xhr;
var requests;

module('fl-api-service', {
  beforeEach: function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) {
      requests.push(req);
    };
  },
  afterEach: function () {
    xhr.restore();
  }
});

test('APIService is defined', function() {
  ok(fl.APIService, 'fl.APIService is defined');
});

test('GET is defined', function() {
  ok(fl.APIService.GET, 'fl.APIService.GET is defined');
});

test('GET works', function() {
  fl.APIService.GET('/foo').then(sinon.spy());

  equal(requests.length, 1);
  equal(requests[0].url, '/foo');
  equal(requests[0].method, 'GET');
  equal(
    JSON.stringify(requests[0].requestHeaders),
    JSON.stringify({
      Accept: 'application/json',
      'Content-Type': 'text/plain;charset=utf-8'
    })
  );
  equal(requests[0].requestBody, undefined);
});

test('POST is defined', function() {
  ok(fl.APIService.POST, 'fl.APIService.POST is defined');
});

test('POST works', function() {
  fl.APIService.POST('/foo', {foo: 'bar'}).then(sinon.spy());

  equal(requests.length, 1);
  equal(requests[0].url, '/foo');
  equal(requests[0].method, 'POST');
  equal(
    JSON.stringify(requests[0].requestHeaders),
    JSON.stringify({
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    })
  );
  equal(requests[0].requestBody, JSON.stringify({foo: 'bar'}));
});

test('PUT is defined', function() {
  ok(fl.APIService.POST, 'fl.APIService.PUT is defined');
});

test('PUT works', function() {
  fl.APIService.PUT('/foo', {foo: 'bar'}).then(sinon.spy());

  equal(requests.length, 1);
  equal(requests[0].url, '/foo');
  equal(requests[0].method, 'PUT');
  equal(
    JSON.stringify(requests[0].requestHeaders),
    JSON.stringify({
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    })
  );
  equal(requests[0].requestBody, JSON.stringify({foo: 'bar'}));
});

test('DELETE is defined', function() {
  ok(fl.APIService.DELETE, 'fl.APIService.DELETE is defined');
});

test('DELETE works', function() {
  fl.APIService.DELETE('/foo').then(sinon.spy());

  equal(requests.length, 1);
  equal(requests[0].url, '/foo');
  equal(requests[0].method, 'DELETE');
  equal(
    JSON.stringify(requests[0].requestHeaders),
    JSON.stringify({
      Accept: 'application/json',
      'Content-Type': 'text/plain;charset=utf-8'
    })
  );
  equal(requests[0].requestBody, undefined);
});

test('PATCH is defined', function() {
  ok(fl.APIService.PATCH, 'fl.APIService.PATCH is defined');
});

test('PATCH works', function() {
  fl.APIService.PATCH('/foo', {foo: 'bar'}).then(sinon.spy());

  equal(requests.length, 1);
  equal(requests[0].url, '/foo');
  equal(requests[0].method, 'PATCH');
  equal(
    JSON.stringify(requests[0].requestHeaders),
    JSON.stringify({
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    })
  );
  equal(requests[0].requestBody, JSON.stringify({foo: 'bar'}));
});


test('resolve is defined', function() {
  ok(fl.APIService.resolve, 'fl.APIService.resolve is defined');
});

asyncTest('resolve works', function() {
  fl.APIService.resolve({foo: 'bar'}).then(function(result) {
    start();
    equal(result.foo, 'bar');
  });
});

test('reject is defined', function() {
  ok(fl.APIService.reject, 'fl.APIService.reject is defined');
});

asyncTest('reject works', function() {
  fl.APIService.reject('because')['catch'](function(reason) {
    start();
    equal(reason, 'because');
  });
});
