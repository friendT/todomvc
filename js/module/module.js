(function (angular) {
	"use strict"
	/*应用程序主要的模块*/
	var myapp = angular.module("myapp", ["MyAppController", "MyAppService", "ngRoute"]);
	myapp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
		$routeProvider.when("/:path?", {	//:id用于保存取到的path值，并通过$routeParams获取
				templateUrl: "myTemplate",
				controller: "MyController"
			});
		$locationProvider.hashPrefix('');	//对URL进行处理，在新版的angular中对URL进行了转码（为了隐藏地址）
	}]);
})(angular);
