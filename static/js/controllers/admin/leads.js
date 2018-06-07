'use strict';
(function(mosenergoAdminApp) {

  mosenergoAdminApp.controller('LeadsController', LeadsController);
  LeadsController.$inject = ['$scope', '$http', 'NgTableParams', '$notify', '$general', '$files', '$modal', '$q', 'MEURL'];
  function LeadsController($scope, $http, NgTableParams, $notify, $general, $files, $modal, $q, MEURL) {
    $scope.createLead = createLead;
    $scope.deleteLead = deleteLead;
    $scope.pickLead = pickLead;

    getManagers();
    $scope.tableParams = new NgTableParams({}, {
      getData: function(params) {
        return $http.get(MEURL + '/list').then(function(res) {
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
    function createLead(lead) {
      if (!$scope.singleSelect) {
        $notify.handlerError('Не выбран менеджер');
        return;
      }

      const params = {
        FileAs: lead.promo,
        Email: lead.email,
        Phone: lead.phone,
        StateEn: "90c78af1-65ac-49e3-8e32-88f23b32ef03",
        OwnerGUID: JSON.parse($scope.singleSelect).crm_id,
        Note: `${lead.name}\r\n${lead.comment}`,
        LeadOriginEn: lead.resource
      }
      console.log(params)
      $modal.closeAll();
      $http.post(MEURL + '/lead', params)
        .success(function(data) {
          console.log(data)
          if (data.ReturnCode == 'rcSuccess') {
            showMessage('Интерес успешно создан в CRM', 'Выполнено')
            deleteLead(lead);
          } else {
            $notify.handlerError(data);
          }
        })
        .error(function(data) {
          $notify.handlerError(data);
        })
    }
    function deleteLead(lead) {
      $http.delete(MEURL + '/lead?id=' + lead.id)
        .success(function(data) {
          showMessage('Интерес успешно удалён из списка', 'Выполнено')
          $scope.tableParams.reload();
        })
        .error(function(data) {
          $notify.handlerError(data);
        })
    }
    function pickLead(lead) {
      $scope.currentLead = lead;
    }
    function getManagers() {
      $http.get(MEURL + '/managers')
        .success(function(data) {
          $scope.managers = data;
        })
        .error(function(data) {
          $notify.handlerError(data);
        })
    }
    function showMessage(text, title) {
      $notify(text, title);
    }
  }

})(window.mosenergoAdminApp);
