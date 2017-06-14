/*service中存放业务逻辑*/
(function (angular) {
	"use strict"
	var service = angular.module("MyAppService", []);
	service.service('MainService', ["$window", function ($window) {

		var storage = $window.localStorage;


		/*获取浏览器localstorage中的数据*/
		var todos = storage["todoList"] ? JSON.parse(storage["todoList"]) : [];

		/*将todos保存到浏览器的localstorage*/
		function save() {
			storage["todoList"] = JSON.stringify(todos);
		};

		/*设置每个todos的ID*/
		function getId() {
			var id = Math.random();
			for (var i = 0; i < todos.length; i++) {
				if (id === todos[i].id) {
					id = getId();
					break;
				}
			}
			return id;
		}


		/*获取todos数据*/
		this.getTodos = function () {
			return todos;
		};

		/*添加addTodos*/
		this.addTodos = function (text) { //这里的text只是输入的文本内容
			todos.push({
				id: getId(),
				text: text,
				completed: false
			});
			save();
		};

		/*编辑后保存*/
		this.editingSave = function () {
			save();
		};
		/*删除todos*/
		this.removeTodos = function (id) {
			for (var i = 0; i < todos.length; i++) {
				if (id === todos[i].id) {
					todos.splice(i, 1);
				}
			}
			save();
		};

		/*单项勾选完成*/
		this.selectCompleted = function () {
			save();
		};

		/*全部完成*/
		var currentStatus = true;
		this.completedAll = function () {
			for (var i = 0; i < todos.length; i++) {
				todos[i].completed = currentStatus;
			}
			currentStatus = !currentStatus;
			save();
			console.log(todos);
		};

		/*清除已经完成的todo*/
		this.clearCompleted = function () {
			var afterClear = [];	//创建一个新的容器，将未完成的todos重新保存在这个容器中
			for (var i = 0; i < todos.length; i++) {
				if (!todos[i].completed) {
					afterClear.push(todos[i]);
					console.log("1");
				}
			}
			todos = afterClear;		//将新容器的指向原来的容器
			save();
			return todos;
		};

	}]);
})(angular);
