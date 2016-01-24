'use strict';

angular.module('mugenCalc.version', [
  'mugenCalc.version.interpolate-filter',
  'mugenCalc.version.version-directive'
])

.value('version', '1.0');
