role_module.controller('AppRoleController', ['$scope', '$location', '$window', 'toastr', 'AppService', 'AppUtil', 'PermissionService',
                                          function ($scope, $location, $window, toastr, AppService, AppUtil, PermissionService) {

                     var params = AppUtil.parseParams($location.$$url);
                     $scope.pageContext = {
                         appId: params.appid
                     };
                     
                     PermissionService.has_assign_user_permission($scope.pageContext.appId)
                         .then(function (result) {
                            $scope.hasAssignUserPermission = result.hasPermission;    
                         }, function (reslt) {
                             
                         });
                                              
                     
                     PermissionService.get_app_role_users($scope.pageContext.appId)
                         .then(function (result) {
                            $scope.appRoleUsers = result;    
                         }, function (result) {
                             
                         });
                                              
                     $scope.toAssignMasterRoleUser = '';

                     $scope.assignMasterRoleToUser = function () {
                         PermissionService.assign_master_role($scope.pageContext.appId,
                                                              $scope.toAssignMasterRoleUser)
                             .then(function (result) {
                                 toastr.success("添加成功");
                                 reloadPage();
                             }, function (result) {
                                 toastr.error(AppUtil.errorMsg(result), "添加失败");
                             });
                     };

                     $scope.removeMasterRoleFromUser = function (user) {
                         if ($scope.appRoleUsers.masterUsers.length <= 1){
                             $('#warning').modal('show');
                             return;
                         } 
                         PermissionService.remove_master_role($scope.pageContext.appId, user)
                             .then(function (result) {
                                 toastr.success("删除成功");
                                 reloadPage();
                             }, function (result) {
                                 toastr.error(AppUtil.errorMsg(result), "删除失败");
                             });
                     };

                     function reloadPage() {
                         setInterval(function () {
                             location.reload(true);
                         }, 1000);

                     }
                 }]);
