/* global describe, it, beforeEach, afterEach, JSON */

import sinon from 'sinon';
import expect from 'expect.js';

import {GET, POST, PUT, DELETE, PATCH,
  resolve, reject} from '../main.js';

describe('fl-api-service', function() {
  var xhr,
    requests;

  beforeEach(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) {
      requests.push(req);
    };
  });

  afterEach(function () {
    xhr.restore();
  });

  describe('GET', function() {
    it('should be defined', function() {
      expect(GET).to.be.a('function');
    });

    it('should fire a GET request', function() {
      GET('/foo').then(sinon.spy());

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/foo');
      expect(requests[0].method).to.equal('GET');
      expect(
        JSON.stringify(requests[0].requestHeaders)
      ).to.equal(
        JSON.stringify({
          Accept: 'application/json',
          'Content-Type': 'text/plain;charset=utf-8'
        })
      );
      expect(requests[0].requestBody).to.equal(null);
    });
  });

  describe('POST', function() {
    it('should be defined', function() {
      expect(POST).to.be.a('function');
    });

    it('should fire a POST request', function() {
      POST('/foo', {foo: 'bar'}).then(sinon.spy());

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/foo');
      expect(requests[0].method).to.equal('POST');
      expect(
        JSON.stringify(requests[0].requestHeaders)
      ).to.equal(
        JSON.stringify({
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        })
      );
      expect(requests[0].requestBody).to.equal(JSON.stringify({foo: 'bar'}));
    });
  });

  describe('PUT', function() {
    it('should be defined', function() {
      expect(PUT).to.be.a('function');
    });

    it('should fire a PUT request', function() {
      PUT('/foo', {foo: 'bar'}).then(sinon.spy());

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/foo');
      expect(requests[0].method).to.equal('PUT');
      expect(
        JSON.stringify(requests[0].requestHeaders)
      ).to.equal(
        JSON.stringify({
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        })
      );
      expect(requests[0].requestBody).to.equal(JSON.stringify({foo: 'bar'}));
    });
  });

  describe('DELETE', function() {
    it('should be defined', function() {
      expect(DELETE).to.be.a('function');
    });

    it('should fire a DELETE request', function() {
      DELETE('/foo').then(sinon.spy());

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/foo');
      expect(requests[0].method).to.equal('DELETE');
      expect(
        JSON.stringify(requests[0].requestHeaders)
      ).to.equal(
        JSON.stringify({
          Accept: 'application/json',
          'Content-Type': 'text/plain;charset=utf-8'
        })
      );
      expect(requests[0].requestBody).to.equal(undefined);
    });
  });

  describe('PATCH', function() {
    it('should be defined', function() {
      expect(PATCH).to.be.a('function');
    });

    it('should fire a PATCH request', function() {
      PATCH('/foo', {foo: 'bar'}).then(sinon.spy());

      expect(requests.length).to.equal(1);
      expect(requests[0].url).to.equal('/foo');
      expect(requests[0].method).to.equal('PATCH');
      expect(
        JSON.stringify(requests[0].requestHeaders)
      ).to.equal(
        JSON.stringify({
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        })
      );
      expect(requests[0].requestBody).to.equal(JSON.stringify({foo: 'bar'}));
    });
  });

  describe('resolve', function() {
    it('should be defined', function() {
      expect(resolve).to.be.a('function');
    });

    it('should resolve properly', function(done) {
      resolve({foo: 'bar'}).then(function(result) {
        expect(result.foo).to.equal('bar');
        done();
      });
    });
  });

  describe('reject', function() {
    it('should be defined', function() {
      expect(reject).to.be.a('function');
    });

    it('should reject properly', function(done) {
      reject('because')['catch'](function(reason) {
        expect(reason).to.equal('because');
        done();
      });
    });
  });

});
