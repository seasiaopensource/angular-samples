/**
 * Created on 01.02.16.
 */
(function () {
  angular.module('common')
    .constant('API_URL', '/app/data')
    .constant('faker', window.faker)
    .constant('WebFont', window.WebFont)
    .constant('Case', window.Case)
    .constant('Snap', window.Snap);
})();
