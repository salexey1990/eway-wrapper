var $modal = angular.module('$modal', []);
$modal.factory('$modal', function() {
	return {
		closeAll: function() {
			$('.modal').modal('hide');
		}
	};
});

var modalEvents = {
  'bsModalShow'   : 'show.bs.modal'  ,
  'bsModalShown'  : 'shown.bs.modal' ,
  'bsModalHide'   : 'hide.bs.modal'  ,
  'bsModalHidden' : 'hidden.bs.modal',
  'bsModalLoaded' : 'loaded.bs.modal',
};

_(modalEvents).each(function(eventName, directiveName) {
  $modal.directive(directiveName, function() {
    var scope = {};
    scope[directiveName] = '&';
    return {
      scope: scope,
      link: function($scope, $element, $attrs) {
        var handler = function(event) {
          $scope[directiveName]({ $event: event, $element: $element })
        }

        $element.on(eventName, handler);
        $scope.$on('$destroy', function() {
          $element.off(eventName, handler);
        });
      }
    }
  });
});
