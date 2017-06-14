(function (window) {
	'use strict';
	angular.module
('addList', [])
		.controller('addListController', ['$scope', '$location', function ($scope, $location) {
			$scope.todos = [];
			// 添加todo
			$scope.addtodo = function () {
				if ($scope.text != "") {
					$scope.todos.push({
						id: Math.random(),
						text: $scope.text,
						completed: false
					});
				}
				console.log("添加成功！")
				$scope.text = "";
			};
			// 全部设置完成
			var now = true;
			$scope.complatedAll = function () {
				console.log("点击成功")
				for (var i = 0; i < $scope.todos.length; i++) {
					$scope.todos[i].completed = now;
				}
				console.log($scope.todos[1].complated);
				now = !now;
			};

			//删除todos
			$scope.remove = function (num) {
				for (var i = 0; i < $scope.todos.length; i++) {
					if (num === $scope.todos[i].id) {
						$scope.todos.splice(i, 1);
					}
				}
			};

			/*删除已完成项*/
			$scope.clearCompleted = function () {
				for (var i = 0; i < $scope.todos.length; i++) {
					console.log($scope.todos[i].completed);
					if ($scope.todos[i].completed) {
						$scope.todos.splice(i, 1);
					}
				}
			};

			/*控制显示*/
			$scope.show = function () {
				for (var i = 0; i < $scope.todos.length; i++) {
					if ($scope.todos[i].completed === true) {
						return true;
					}
				}
			};

			/*双击进行编辑*/
			$scope.currentEditingId = -1;
			$scope.editing = function (id, boolean) {
				if (!boolean) {
					$scope.currentEditingId = id;
				}

			};

			/*编辑后保存*/

			$scope.save = function () {
				$scope.currentEditingId = -1;
			};

			/*过滤筛选*/
			$scope.selector = {};
			/*将传入的$location赋值给$scope.$location*/
			$scope.$location = $location;
			/*这里的$location是$scope中的$location*/
			/* 每当锚点改变时，浏览器并没有刷洗，也就没有数据的重新请求，所以需要对锚点进行监视*/
			$scope.$watch("$location.hash()", function (now, old) {
				console.log(now);
				switch (now) {
					case "/active":
						$scope.selector = {completed: false};
						break;
					case "/completed":
						$scope.selector = {completed: true};
						break;
					default :
						$scope.selector = {};
						break;
				}
			});

		}]);

})(window);
