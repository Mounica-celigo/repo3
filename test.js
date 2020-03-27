'use strict'

var source = require('./source')
var should = require('should')

describe('first set', function () {
    it('first test with invalid arguments', function (done) {
        var a = 1,
            b,
            expected = 0;
        var result = source.add(a, b)
        result.should.equal(expected)
        done()
    })
    it('first test with valid arguments', function (done) {
        var a = 1,
            b = 2,
            expected = 3;
        var result = source.add(a, b)
        result.should.equal(expected)
        done()
    })
    it('first test with valid big arguments', function (done) {
        var a = 100000,
            b = 200000,
            expected = 300000;
        var result = source.add(a, b)
        result.should.equal(expected)
        done()
    })
})