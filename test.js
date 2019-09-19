<<<<<<< HEAD
'use strict'

var source = require('./source')
var should = require('should')

describe('first set', function () {
    
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
=======
'use strict'

var source = require('./source')
var should = require('should')

describe('first set', function () {
    
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
>>>>>>> 33a0e936c7bd2c62b54e98a7b311766313d488b4
