var filmApp = angular.module('filmApp',['ngRoute','ngResource']);

//cau hinh cac dinh tuyen ung dung
filmApp.config(function($routeProvider){
	$routeProvider.when('/',{
			templateUrl : 'pages/home.html',
			controller: 'homeController'
	})

	.when('/detail/:pages',{
			templateUrl: 'pages/detail.html',
			controller: 'detailController'
	})
	.when('/detail',{
			url: 'pages/detail.html',
			controller: 'detailController'
	})
	.when('/nowplaying/:pages',{
			templateUrl: 'pages/nowplaying.html',
			controller: 'nowplayingController'
	})
	.when('/nowplaying',{
			templateUrl: 'pages/nowplaying.html',
			controller: 'nowplayingController'
	})
	.when('/popular/:pages',{
			templateUrl: 'pages/popular.html',
			controller: 'popularController'
	})
	.when('/popular',{
			templateUrl: 'pages/popular.html',
			controller: 'popularController'
	})
	.when('/listfilm',{
			templateUrl: 'pages/search.html',
			controller: 'searchController'
	})
	.when('/search',{
		templateUrl: 'pages/search.html',
		controller: 'searchController'
	})
	.when('/search/:pages',{
		templateUrl: 'pages/search.html',
		controller: 'searchController'
	})
	.when('/film/:id',{
		templateUrl: 'pages/show.html',
		controller: 'showController'
	})
	.when('/category',{
		templateUrl: 'pages/showCategory.html',
		controller: 'showCategoryController'
	})
.when('/category/:idCategory',{
		templateUrl: 'pages/category.html',
		controller: 'categoryController'
	})

});	
filmApp.directive('myExmDirective', function(){
	return{
		templateUrl : '<h1>Xin chao</h1>'
	};
});

filmApp.controller('categoryController',['$scope', '$resource', '$http', '$routeParams', function($scope, $resource, $http, $routeParams){
	$scope.idCategory = $routeParams.idCategory;
	$http.get("https://api.themoviedb.org/3/genre/"+$scope.idCategory+"/movies?api_key=931e54c126cfca6e31b0c905d36d6614&include_adult=false&sort_by=created_at.asc").then(function(response){
		$scope.data = response.data;
		console.log("show category = ");
		console.log($scope.data);
	});
}]);

filmApp.controller('showCategoryController',['$scope','$resource', '$http', '$routeParams', function($scope, $resource, $http, $routeParams){
	$http.get("https://api.themoviedb.org/3/genre/movie/list?api_key=931e54c126cfca6e31b0c905d36d6614&language=en-US").then(function(response){
		$scope.listCategory = response.data;
		console.log("category = ");
		console.log($scope.listCategory);
	});
}]);


filmApp.service('searchFilm',function(){
		this.ten ="";
		// this.pages=array();
});

filmApp.controller('homeController', ['$scope', '$resource','$http','searchFilm', function($scope, $resource,$http,searchFilm) {
	console.log("Home Controller");
	$scope.ten = searchFilm.ten;
	$scope.$watch('ten',function(){
		searchFilm.ten = $scope.ten;
	})
    $http.get("https://api.themoviedb.org/3/genre/movie/list?api_key=931e54c126cfca6e31b0c905d36d6614&language=en-US").then(function(response){
        $scope.listCategory = response.data;
        console.log($scope.listCategory);
    });
    $http.get("https://api.themoviedb.org/3/movie/popular?api_key=931e54c126cfca6e31b0c905d36d6614&language=en-US&total_results=4").then(function(response){
        $scope.data = response.data;
        console.log($scope.data);
    });
}]);


filmApp.controller('searchController', ['$scope', '$resource','$http','$routeParams','searchFilm', function($scope, $resource,$http,$routeParams,searchFilm) {
    console.log("Search Controller");
    $scope.pages = [];
	$scope.page = $routeParams.pages || 1;
	$scope.ten= searchFilm.ten;
	var url = "https://api.themoviedb.org/3/search/movie?api_key=931e54c126cfca6e31b0c905d36d6614&query="+searchFilm.ten+"&page="+$scope.page;
    var request = $http.get(url).then(function(response){
    	$scope.data = response.data;
    	for (var i = 1; i <= $scope.data.total_pages; i++) {
	    	$scope.pages[i]=i;
	    }
	    console.log($scope.pages);
    	console.log($scope.data);
    });
    
    
}]);
filmApp.controller('nowplayingController', ['$scope', '$resource', '$http', '$routeParams', function($scope, $resource, $http, $routeParams){
	$scope.pages = [];
	$scope.page = $routeParams.pages || 1;
	var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=931e54c126cfca6e31b0c905d36d6614&page="+ $scope.page;
	var request = $http.get(url).then(function(response){
		$scope.data = response.data;
		for( var i = 1 ; i<= $scope.data.total_pages; i++){
			$scope.pages[i] = i;
		}
		console.log($scope.pages);
    	console.log($scope.data);
	})
}]);

filmApp.controller('popularController', ['$scope', '$resource', '$http', '$routeParams', function($scope, $resource, $http, $routeParams){
	$scope.pages = [];
	$scope.page = $routeParams.pages || 1;
	var url = "https://api.themoviedb.org/3/movie/popular?api_key=931e54c126cfca6e31b0c905d36d6614&page=" + $scope.page;
	var request = $http.get(url).then(function(response){
		$scope.data = response.data;
		for( var i=1 ; i<= $scope.data.total_pages ; i++){
			$scope.pages[i] = i;

		}
		console.log($scope.pages);
		console.log($scope.data);
	});
}]);


filmApp.service('apiService',['$resoure','$http','$routeParams', function($resource, $http, $routeParams
){
	this.api = function(){
		var data = {};
		$scope.page = $routeParams.pages || 1;
		var url = "https://api.themoviedb.org/3/movie/popular?api_key=931e54c126cfca6e31b0c905d36d6614&language=en-US&page="+ $scope.page;
		return $http.get(url);
	}
}]);

filmApp.controller('detailController',['$scope', '$resoure' , '$http', '$routeParams' , 'apiService', function($scope, $resoure, $http ,$routeParams, apiService){
	$scope.page = $routeParams.pages || 1;

	var url = "https://api.themoviedb.org/3/movie/popular?api_key=931e54c126cfca6e31b0c905d36d6614&language=en-US&page="+ $scope.page;

	var request = $http.get(url).then(function(response){
		$scope.data = response.data;
		console.log($scope.data);
	});

	request.then(function(data){
		
	});
}]);

filmApp.filter("trustUrl", ['$sce', function($sce){
	return function (recordingUrl){
		return $sce.trustAsResourceUrl(recordingUrl);
	}
}]);

filmApp.controller('showController',['$scope', '$resource', '$http', '$routeParams', function($scope, $resource, $http, $routeParams){
	$scope.id = $routeParams.id;
	//console.log("ok");
	var url = "https://api.themoviedb.org/3/movie/"+$scope.id+"?api_key=931e54c126cfca6e31b0c905d36d6614";
	var request = $http.get(url).then(function(response){
		$scope.data = response.data;
		console.log($scope.data);
	})
	var url1 = "https://api.themoviedb.org/3/movie/"+$scope.id+"/videos?api_key=931e54c126cfca6e31b0c905d36d6614&language=en-US";
	$http.get(url1).then(function(response){
		$scope.video = response.data;
		console.log("video = ");
		console.log($scope.video);
		$scope.linkUrl = "https://www.youtube.com/embed/"+$scope.video.results[0].key;
		console.log("link = ");
		console.log($scope.linkUrl);
	});
}]);

