(function () {
  'use strict';

  angular
    .module('common.services', [
      'common.services.project',
      'common.services.page',
      'common.services.projectrest',
      'common.services.pagerest',
      'common.services.rx'
    ]);
})();
