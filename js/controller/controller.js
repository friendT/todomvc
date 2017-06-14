(function (angular) {
	"use strict"
	/*创建一个模块*/
	var mycontroller = angular.module("MyAppController", ["ngRoute"]);

	/*注册一个控制器*/
	mycontroller.controller('MyController', ['$scope', "$location", "MainService", "$routeParams", function ($scope, $location, MainService, $routeParams) {

		/*绑定文本框的内容*/
		$scope.text = "";

		/*获取服务器上的todos*/
		$scope.todos = MainService.getTodos();


		/*新增todos*/
		$scope.add = function () {

			if ($scope.text != "") {
				MainService.addTodos($scope.text);
			} else {
				return
			}
			$scope.text = "";
		};

		/*删除todos*/
		$scope.remove = function (id) {
			MainService.removeTodos(id);
		};

		/*删除已完成*/
		$scope.clearCompleted = function () {
			var newTodos = MainService.clearCompleted();
			$scope.todos = newTodos;
		};

		/*编辑todos*/
		$scope.currentClickId = -1;
		$scope.editing = function (id, status) {

			if (!status) {
				$scope.currentClickId = id;

			}
		};

		/*编辑后保存*/
		$scope.editingSave = function () {
			$scope.currentClickId = -1;
			MainService.editingSave();
		};

		/*勾选完成*/
		$scope.selector = function () {
			MainService.selectCompleted();
			console.log("ok")
		}

		/*全部完成*/
		$scope.selectorAll = function () {
			MainService.completedAll();
		};

		/*控制显示*/
		$scope.show = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].completed === true) {
					return true;
				}
			}
		};
		/*筛选*/
		var status = $routeParams.path;	//获取地址栏中的path值（锚点）
		var location = $location;
		// console.log(status);
		switch (status) {
			case "active":
				$scope.filter = {completed: false};
				// console.log($scope.filter);
				break;
			case "completed":
				$scope.filter = {completed: true};
				// console.log($scope.filter);
				break;
			default:
				$scope.filter = {};
				// console.log($scope.filter);
				break;
		}

		/*比较函数,用于filter（滤镜）的筛选*/
		$scope.equalCompare = function (source, target) {
			// console.log(source);
			// console.log(target);
			var result = angular.equals(source, target);
			// console.log(result);
			return result;
		};
	}]);
})(angular);
