'use strict';

describe('mugenCalc.version module', function() {
  beforeEach(module('mugenCalc.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
