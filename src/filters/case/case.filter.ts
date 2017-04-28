/**
 * Created on 13.03.16.
 */
(function () {
  'use strict';

  /**
   * @description Converts a string using one of the methods provided by {@link https://github.com/nbubna/Case#documentation}
   */
  /** @ngInject */
  function CaseFilter(Case): (str: string, method?: string) => string {
    /**
     * @param {string} str
     * @param {string} method
     */
    return (str: string = '', method: string) => {
      if (method && angular.isFunction(Case[method])) {
        return Case[method].call(Case, str);
      }
      return str;
    };
  }

  angular.module('common.filters.case', [])
    .filter('zmCase', CaseFilter);

})();
