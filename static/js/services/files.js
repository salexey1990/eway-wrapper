'use strict';

var module = angular.module('files', [])

module.directive('ngFileChange', function() {
  return {
    scope: {
      ngFileChange: '&'
    },
    link: function($scope, $element, $attrs) {
      var handler = function(event) {
        $scope.ngFileChange({ $event: event, $element: $element })
      }

      $element.on('change', handler);
      $scope.$on('$destroy', function() {
        $element.off('change', handler);
      });
    }
  }
});

module.factory('$files', [
  '$q',

  function($q) {
    return {
      readAsDataURL: function(files) {
        var handlers = _(files).map(function (file) {
          var deferred = $q.defer();
          var reader = new FileReader();
          reader.onload = function(e) {
            deferred.resolve({ file: file, img: reader.result });
          };
          reader.onerror = function(e) {
            deferred.reject(e)
          };
          reader.readAsDataURL(file);
          return deferred.promise;
        });
        return $q.all(handlers)
      }
    };
  }

]);
