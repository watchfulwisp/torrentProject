var tp = require('../lib/torrentProject.js'),
  assert = require('assert');

describe('search', function(){
  describe('query', function(){
    it('should return error on empty order_by', function(){
      tp.search('', 'matches', 'json', function(err, data){
        assert.notEqual(null, err);
      });
    });
  });
  describe('order_by', function(){
    it('should return error on invalid order_by', function(){
      tp.search('debian 7 dvd', '', 'json', function(err, data){
        assert.notEqual(null, err);
      });
    });
  });
  describe('format', function(){
    it('should return error on invalid order_by', function(){
      tp.search('debian 7 dvd', 'matches', '', function(err, data){
        assert.notEqual(null, err);
      });
    });
  });
});

describe('peers', function(){
  describe('hash', function(){
    it('should return error on invalid hash', function(){
      tp.peers('', function(err, data){
        assert.notEqual(null, err);
      });
    });
  });
});

describe('trackers', function(){
  describe('hash', function(){
    it('should return error on invalid hash', function(){
      tp.trackers('', 'json', function(err, data){
        assert.notEqual(null, err);
      });
    });
  });
  describe('format', function(){
    it('should return error on invalid format', function(){
      tp.trackers('8ac3731ad4b039c05393b5404afa6e7397810b41', '', function(err, data){
        assert.notEqual(null, err);
      });
    });
  });
});