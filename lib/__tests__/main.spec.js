/* global describe, it, beforeEach, afterEach, JSON */

import sinon from 'sinon';
import expect from 'expect.js';
import injectr from 'injectr';

describe('fl-api-service', function () {
  var API = require('../main.js');

  it("should exist", function () {
    expect(API).to.be.ok();
  });

  it("should expose the right things", function () {
    expect(API.config).to.be.an('object');
    expect(API.config.setEndpoint).to.be.a('function');
    expect(API.METADATA_KEY).to.be.a('string');
    expect(API.METADATA_KEY).to.be('__API_metadata__');
    expect(API.GET).to.be.a('function');
    expect(API.POST).to.be.a('function');
    expect(API.PATCH).to.be.a('function');
    expect(API.PUT).to.be.a('function');
    expect(API.DELETE).to.be.a('function');
    expect(API.resolve).to.be.a('function');
    expect(API.reject).to.be.a('function');
  });
});

describe('fl-api-service -- with xmlhttprequest mocked', function () {
  var xhrMockContext = [];
  var handlerSpy = sinon.spy();
  var API = injectr('../main.js', {
    'xmlhttprequest': {
      XMLHttpRequest: function () {
        xhrMockContext.push(this);
        this.open = sinon.spy();
        this.setRequestHeader = sinon.spy();
        this.send = sinon.spy();
      }
    },
    './handler.js': handlerSpy
  });

  beforeEach(function() {
    handlerSpy.reset();
  });

  describe('GET', function () {
    API.GET('/movies');

    it("should set xhr.onreadystatechange", function () {
      expect(xhrMockContext[0].onreadystatechange).to.be.a('function');

      xhrMockContext[0].onreadystatechange();
      expect(handlerSpy.calledOnce).to.be(true);
    });

    it("should call xhr.open", function () {
      expect(xhrMockContext[0].open.calledOnce).to.be(true);
      expect(xhrMockContext[0].open.calledWith('GET', '/movies')).to.be(true);
    });

    it("should set the correct headers", function () {
      expect(xhrMockContext[0].setRequestHeader.calledTwice).to.be(true);
      expect(xhrMockContext[0].setRequestHeader.calledWith('Accept', 'application/json')).to.be(true);
      expect(xhrMockContext[0].setRequestHeader.calledWith('Content-Type', 'text/plain;charset=utf-8')).to.be(true);
    });

    it("should send the request properly", function () {
      expect(xhrMockContext[0].send.calledOnce).to.be(true);
      expect(xhrMockContext[0].send.calledWith()).to.be(true);
    });
  });

  describe('POST', function () {
    var body = {year: 2009, title: 'foo'};
    API.POST('/movies/1', body);

    it("should set xhr.onreadystatechange", function () {
      expect(xhrMockContext[1].onreadystatechange).to.be.a('function');
      xhrMockContext[1].onreadystatechange();
      expect(handlerSpy.calledOnce).to.be(true);
    });

    it("should call xhr.open", function () {
      expect(xhrMockContext[1].open.calledOnce).to.be(true);
      expect(xhrMockContext[1].open.calledWith('POST', '/movies/1')).to.be(true);
    });

    it("should set the correct headers", function () {
      expect(xhrMockContext[1].setRequestHeader.calledTwice).to.be(true);
      expect(xhrMockContext[1].setRequestHeader.calledWith('Accept', 'application/json')).to.be(true);
      expect(xhrMockContext[1].setRequestHeader.calledWith('Content-Type', 'application/json;charset=utf-8')).to.be(true);
    });

    it("should send the request properly", function () {
      expect(xhrMockContext[1].send.calledOnce).to.be(true);
      expect(xhrMockContext[1].send.calledWith(JSON.stringify(body))).to.be(true);
    });
  });

  describe('PUT', function () {
    var body = {id: 1, year: 2009, title: 'foo'};
    API.PUT('/movies', body);

    it("should set xhr.onreadystatechange", function () {
      expect(xhrMockContext[2].onreadystatechange).to.be.a('function');
      xhrMockContext[2].onreadystatechange();
      expect(handlerSpy.calledOnce).to.be(true);
    });

    it("should call xhr.open", function () {
      expect(xhrMockContext[2].open.calledOnce).to.be(true);
      expect(xhrMockContext[2].open.calledWith('PUT', '/movies')).to.be(true);
    });

    it("should set the correct headers", function () {
      expect(xhrMockContext[2].setRequestHeader.calledTwice).to.be(true);
      expect(xhrMockContext[2].setRequestHeader.calledWith('Accept', 'application/json')).to.be(true);
      expect(xhrMockContext[2].setRequestHeader.calledWith('Content-Type', 'application/json;charset=utf-8')).to.be(true);
    });

    it("should send the request properly", function () {
      expect(xhrMockContext[2].send.calledOnce).to.be(true);
      expect(xhrMockContext[2].send.calledWith(JSON.stringify(body))).to.be(true);
    });
  });

  describe('PATCH', function () {
    var body = {title: 'bar'};
    API.PATCH('/movies/1', body);

    it("should set xhr.onreadystatechange", function () {
      expect(xhrMockContext[3].onreadystatechange).to.be.a('function');
      xhrMockContext[3].onreadystatechange();
      expect(handlerSpy.calledOnce).to.be(true);
    });

    it("should call xhr.open", function () {
      expect(xhrMockContext[3].open.calledOnce).to.be(true);
      expect(xhrMockContext[3].open.calledWith('PATCH', '/movies/1')).to.be(true);
    });

    it("should set the correct headers", function () {
      expect(xhrMockContext[3].setRequestHeader.calledTwice).to.be(true);
      expect(xhrMockContext[3].setRequestHeader.calledWith('Accept', 'application/json')).to.be(true);
      expect(xhrMockContext[3].setRequestHeader.calledWith('Content-Type', 'application/json;charset=utf-8')).to.be(true);
    });

    it("should send the request properly", function () {
      expect(xhrMockContext[3].send.calledOnce).to.be(true);
      expect(xhrMockContext[3].send.calledWith(JSON.stringify(body))).to.be(true);
    });
  });

  describe('DELETE', function () {
    API.DELETE('/movies/1');

    it("should set xhr.onreadystatechange", function () {
      expect(xhrMockContext[4].onreadystatechange).to.be.a('function');
      xhrMockContext[4].onreadystatechange();
      expect(handlerSpy.calledOnce).to.be(true);
    });

    it("should call xhr.open", function () {
      expect(xhrMockContext[4].open.calledOnce).to.be(true);
      expect(xhrMockContext[4].open.calledWith('DELETE', '/movies/1')).to.be(true);
    });

    it("should set the correct headers", function () {
      expect(xhrMockContext[4].setRequestHeader.calledTwice).to.be(true);
      expect(xhrMockContext[4].setRequestHeader.calledWith('Accept', 'application/json')).to.be(true);
      expect(xhrMockContext[4].setRequestHeader.calledWith('Content-Type', 'text/plain;charset=utf-8')).to.be(true);
    });

    it("should send the request properly", function () {
      expect(xhrMockContext[4].send.calledOnce).to.be(true);
      expect(xhrMockContext[4].send.calledWith()).to.be(true);
    });
  });
});
