/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('starter.services')

  .service('utilService', function ($http, $q, $ionicLoading, $ionicPopup) {

    this.checkMobile = function (mobileNumber) {
      if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(mobileNumber))) {
        return false;
      } else
        return true;
    };

    this.getFileMD5 = function (filePath, callback)
    {
      cordova.require("com.billboard.md5.MD5forFile").file_md5(filePath, function (md5)
      {
        if (callback)
          callback(md5);

      }, function () {
        if (callback)
          callback(undefined)
      });
    };




    this.selectImage = function (callback)
    {
//            $ionicLoading.show({
//                template: '<ion-spinner icon="spiral"></ion-spinner>'
//            });
      if (!window.imagePicker)
      {
          if(callback)
          {
              callback(undefined);
          }
            return;
      }
      

      var imageInfo = [];

      getFileMD5 = function (filePath, callback)
      {
        cordova.require("com.billboard.md5.MD5forFile").file_md5(filePath, function (md5)
        {
          if (callback)
            callback(filePath, md5);

        }, function () {
          if (callback)
            callback(undefined, undefined)
        });
      };

      function getMD5s(results, callback)
      {
        if (results.length == 0)
        {
          callback([]);
          return;
        }

        var index = 0;

        for (var i = 0; i < results.length; i++) {

          getFileMD5(results[i], function (filePath, md5)
          {
            console.log("md5s is" + md5.toString());
            console.log("filePath is" + filePath);
            imageInfo.push({"filePath": filePath, "md5": md5});


            index++;

            if (index == results.length)
            {
              console.log("imageinfo is " + imageInfo);
              callback(imageInfo);

            }
          });
        }

      }
      
      function errorCall()
      {
        if (callback)
        {
          callback(undefined);
        }
      }
      
      function pickerFailure()
      {
        // $ionicLoading.hide();
        
        console.log('Error: ' + error);
        errorCall();
      }

      function pickerSuccess(results)
      {
        //$ionicLoading.hide();

        if (results.length == 0)
        {
          
          errorCall();
          return;
        }
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
        }

        getMD5s(results, function (infos)
        {
          if (callback)
          {
            callback(infos);
          }


        });

      }

      window.imagePicker.getPictures(pickerSuccess, pickerFailure, {
        maximumImagesCount: 6
      });


    };

    this.showAlert = function (title, template, callback)
    {
      var alertPopup = $ionicPopup.alert({
        title: '<strong>' + title + '</strong>',
        template: template
      });
      alertPopup.then(function (res) {
        if (callback)
          callback();
      });
    };

    this.showPopup = function (title, subtitle, callback, scope, inputType) {

      scope.data = {};

      if (inputType == undefined)
      {
        inputType = "number";
      }
      // 自定义弹窗
      var myPopup = $ionicPopup.show({
        template: '<input type="' + inputType + '" ng-model="data.value" autoFocus>',
        title: '<strong>' + title + '</strong>',
        subTitle: subtitle,
        scope: scope,
        buttons: [
          {text: '取消'},
          {
            text: '<b>确定</b>',
            type: 'button-positive',
            onTap: function (e) {
              return scope.data.value;
            }
          },
        ]
      });


      myPopup.then(function (res) {
        if (callback)
          callback(res);
        console.log('Tapped!', res);
      });

    };

    this.showConfirm = function (title, template, okText, cancelText, callback)
    {
      var confirmPopup = $ionicPopup.confirm({
        title: '<strong>' + title + '</strong>',
        template: template,
        okText: okText,
        cancelText: cancelText
      });

      confirmPopup.then(function (res) {
        if (res) {
          if (callback)
            callback(res);
        } else {
          // Don't close  
        }
      });


    };

  });
