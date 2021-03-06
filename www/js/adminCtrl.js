/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('starter.controllers')

  .controller('AdminCtrl', function ($scope, aJaxService, utilService, $state) {

    $scope.user = {};

    var requestUrl = "?cmd=customDetail&token=" + aJaxService.getToken();

    aJaxService.httpGetData(requestUrl)
      .success(function (data) {
        $scope.user = data.data;
      })
      .error(function (data) {
        utilService.showAlert('获取信息失败', '获取用户信息失败！请重新获取！');
      });

    $scope.logout = function () {

      utilService.showConfirm('取消登录', '确认登出吗?', '确定', '取消', function () {

        aJaxService.logout()
          .success(function (data) {
            $state.go("login");
          });

      });

    };


  });
