import IAttributes = angular.IAttributes;
/**
 * Created on 09.03.16.
 */
(function () {
  'use strict';

  angular.module('common.directives.clickoutside', [])
    .directive('zmClickOutside', ClickOutsideDirective);

  /* @ngInject */
  function ClickOutsideDirective($parse, $timeout, $document) {
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
      const fn: Function = $parse(attrs['zmClickOutside']);
      const ev: string = 'click.clickoutside';
      /**
       * Handle click event
       * @param {Event} $event - the event
       */
      const onClick = ($event: JQueryMouseEventObject) => {
        let child: boolean, self: boolean, inside: boolean;
        child = element.has($event.target).length > 0;
        self = element.get(0) === $event.target;
        inside = child || self;
        if (!inside) {
          scope.$apply(() => {
            fn(scope, {
              $event
            });
          });
        }
      };

      /**
       * Handle binding / unbinding of the event based on the current status
       */
      scope.$watch(attrs['zmActive'], (active: boolean) => {
        if (active) {
          $timeout(function () {
            $document.on(ev, onClick);
          });
        } else {
          $document.off(ev, onClick);
        }
      });

      /**
       * Handle scope removal to clean up event handlers
       */
      scope.$on('$destroy', () => {
        $document.off(ev, onClick);
      });
    }
  }
})();
