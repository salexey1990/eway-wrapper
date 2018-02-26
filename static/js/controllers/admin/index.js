'use strict';
(function(mosenergoAdminApp) {

  mosenergoAdminApp.controller('LeadsController', LeadsController);
  LeadsController.$inject = ['$scope', '$http', 'NgTableParams', '$notify', '$general', '$files', '$modal', '$q', 'MEURL'];
  function LeadsController($scope, $http, NgTableParams, $notify, $general, $files, $modal, $q, MEURL) {
    var GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
    $scope.tableParams = new NgTableParams({}, {
      getData: function(params) {
        return $http.get(MEURL + '/list').then(function(res) {
          console.log(res);
          if (res && res.status == 200) {
            params.total(res.data.length);
            $scope.leads = res.data
            return $scope.leads;
          } else {
            $notify.handlerError(res.data);
            params.total(0);
            return [];
          }
        });
      }
    });
  }

})(window.mosenergoAdminApp);
