/**
 * Created on 29.07.16.
 */
(function() {
  'use strict';

  angular.module('common.directives.autoselect', [])
    .directive('zmAutoselect', AutoselectDirective);

  /* @ngInject */
  function AutoselectDirective() {
    return {
      restrict: 'A',
      link: postLink
    };

    /**
     *
     * @param scope
     * @param element
     * @param attrs
     */
    function postLink(scope: IScope, element: angular.IAugmentedJQuery, attrs: IAttributes) {
      scope.$watch(attrs['zmAutoSelect'], () => {
        element.select();
      });
    }
  }
})();
