var test = require('tap').test,
    util = require('util'),
    restify = require('restify'),
    wf = require('../lib/index');


test('errors defined', function (t) {
    t.equal(typeof (wf.BackendError), 'function');
    t.equal(typeof (wf.BackendInternalError), 'function');
    t.equal(typeof (wf.BackendInvalidArgumentError), 'function');
    t.equal(typeof (wf.BackendMissingParameterError), 'function');
    t.equal(typeof (wf.BackendPreconditionFailedError), 'function');
    t.equal(typeof (wf.BackendResourceNotFoundError), 'function');
    t.end();
});

test('errors to RestErrors', function (t) {
    var nfError, nfRestError, errors = [
        wf.BackendInternalError,
        wf.BackendInvalidArgumentError,
        wf.BackendMissingParameterError,
        wf.BackendPreconditionFailedError,
        wf.BackendResourceNotFoundError
    ];
    errors.forEach(function (E) {
        nfError = new E('A message');
        t.equal(typeof (nfError), 'object');
        nfRestError = nfError.toRestError;
        t.equal(typeof (nfRestError), 'object');
        t.equal(nfError.statusCode, nfRestError.statusCode);
        t.equal(nfError.message, nfRestError.message);
    });
    t.end();
});
