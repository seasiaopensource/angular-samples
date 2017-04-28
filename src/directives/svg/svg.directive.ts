/**
 * Created on 01.09.16.
 */
(function () {
  'use strict';

  const DIRECTIVE = 'zmCommonSvg';

  /* @ngInject */
  function SvgDirective($sce: angular.ISCEService) {
    const directive: angular.IDirective = {
      restrict: 'A',
      link: postLink
    };
    return directive;

    /**
     *
     */
    function postLink(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) {
      attrs.$observe(DIRECTIVE, (svg: string = '') => {
        const src: string = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
        attrs.$set('src', getTrustedSvg(src));
      });
    }

    /**
     *
     * @param svg
     * @returns {any}
     */
    function getTrustedSvg(svg: string) {
      return $sce.trustAsHtml(svg);
    }

  }

  angular.module('common.directives.svg', [])
    .directive(DIRECTIVE, SvgDirective);
})();
