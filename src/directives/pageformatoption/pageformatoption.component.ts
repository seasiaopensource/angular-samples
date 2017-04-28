/**
 * Created on 12.02.16.
 */
(function () {
  'use strict';

  /**
   *
   */
  class PageFormatOption {

    constructor(private zmPageFormatService) {

    }

    /**
     *
     * @param format
     * @returns {boolean}
     */
    isFixedFormat(format: IPageFormat): boolean {
      return this.zmPageFormatService.isFixedFormat(format);
    }

    /**
     *
     * @param unit
     * @return {string}
     */
    getUnitLabel(unit: number): string {
      return this.zmPageFormatService.getUnitLabel(unit);
    }
  }

  angular.module('common.directives.pageformatoption', [])
    .controller('zmPageFormatOption', PageFormatOption)
    .component('zmPageFormatOption', {
      templateUrl: 'app/main/common/directives/pageformatoption/pageformatoption.html',
      controller: 'zmPageFormatOption as vm',
      bindings: {
        format: '='
      }
    });
})();
