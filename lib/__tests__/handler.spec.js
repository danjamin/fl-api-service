/* global describe, it */

var sinon = require('sinon');
var expect = require('expect.js');
var METADATA_KEY = require('../consts.js').METADATA_KEY;

describe('handler', function () {
  var handler = require('../handler.js');

  it("should exist", function () {
    expect(handler).to.be.ok();
    expect(handler).to.be.a('function');
  });

  it("should not respond to unready states", function () {
    var resolveSpy = sinon.spy();
    var rejectSpy = sinon.spy();
    var xhrMock = {};

    xhrMock.readyState = 1;

    handler(xhrMock, resolveSpy, rejectSpy);
    expect(resolveSpy.called).to.be(false);
    expect(rejectSpy.called).to.be(false);

    xhrMock.readyState = 2;

    handler(xhrMock, resolveSpy, rejectSpy);
    expect(resolveSpy.called).to.be(false);
    expect(rejectSpy.called).to.be(false);

    xhrMock.readyState = 3;

    handler(xhrMock, resolveSpy, rejectSpy);
    expect(resolveSpy.called).to.be(false);
    expect(rejectSpy.called).to.be(false);
  });

  it("should respond to ready state with 200 status", function () {
    var resolveSpy = sinon.spy();
    var rejectSpy = sinon.spy();
    var xhrMock = {};

    xhrMock.readyState = 4;
    xhrMock.status = 200;
    xhrMock.responseText = '{"id": 1}';

    handler(xhrMock, resolveSpy, rejectSpy);

    expect(resolveSpy.calledOnce).to.be(true);
    expect(rejectSpy.called).to.be(false);
  });

  it("should include response and XHR in meta data", function () {
    var resolveSpy = sinon.spy();
    var rejectSpy = sinon.spy();
    var xhrMock = {};
    var expectedResponse = {
      id: 1
    };
    expectedResponse[METADATA_KEY] = { xhr: xhrMock };

    xhrMock.readyState = 4;
    xhrMock.status = 200;
    xhrMock.responseText = '{"id": 1}';

    handler(xhrMock, resolveSpy, rejectSpy);

    expect(resolveSpy.calledOnce).to.be(true);
    expect(resolveSpy.calledWith(expectedResponse)).to.be(true);
  });

  it("should reject NON 200 responses", function () {
    var resolveSpy = sinon.spy();
    var rejectSpy = sinon.spy();
    var xhrMock = {};

    xhrMock.readyState = 4;
    xhrMock.status = 401;
    xhrMock.responseText = '{"id": 1}';

    handler(xhrMock, resolveSpy, rejectSpy);

    expect(resolveSpy.called).to.be(false);
    expect(rejectSpy.calledOnce).to.be(true);
    expect(rejectSpy.calledWith(xhrMock)).to.be(true);
  });

});
