'use strict';
(function(mosenergoAdminApp) {

  mosenergoAdminApp.controller('LeadsController', LeadsController);
  LeadsController.$inject = ['$scope', '$http', 'NgTableParams', '$notify', '$general', '$files', '$modal', '$q', 'MEURL'];
  function LeadsController($scope, $http, NgTableParams, $notify, $general, $files, $modal, $q, MEURL) {
    var GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
    $scope.getAddress = getAddress;
    $scope.tableParams = new NgTableParams({}, {
      getData: function(params) {
        return $http.get(MEURL + '/station/list').then(function(res) {
          if (res && res.status == 200) {
            params.total(res.data.length);
            $scope.stations = res.data.map((station) => {
              if (station.transactionId) {
                station.status = 'charging';
              } else {
                station.status = 'ok';
              }
              return station;
            })
            return $scope.stations;
          } else {
            $notify.handlerError(res.data);
            params.total(0);
            return [];
          }
        });
      }
    });
    function getAddress(stationId, lat, lon) {
      var options = {
        params: {
          language: "ru",
          latlng: lat + ',' + lon,
        },
        withCredentials: false,
      };

      $http.get(GEOCODE_URL, options).then(function(res) {
        if (res.data.results.length) {
          $http.put(MEURL + '/station/' + stationId, {address: res.data.results[0].formatted_address}).then(function(res) {
            $scope.tableParams.reload();
          })
        } else {
          $notify('Error');
        }
      });
    }
    // console.log($scope.stations);
    // console.log($scope.tableParams);
  }

})(window.mosenergoAdminApp);
