var app = angular.module('Myapp', ['ui.router','ngResource','angular-growl','ngStorage']);
app.config(['$stateProvider', '$urlRouterProvider','growlProvider', function($stateProvider, $urlRouterProvider,growlProvider){
	
	$urlRouterProvider.otherwise("list")
	growlProvider.globalTimeToLive(2000);
	growlProvider.globalReversedOrder(true);

	$stateProvider
	    .state("list", {
	        url:'/list',
	        templateUrl: 'list.html',
	        controller: 'mainController',
	      })	
		
		$stateProvider
	    .state("add", {
	        url:'/detail',
	        templateUrl: 'add.html',
	        controller: 'detailController',
	      })
  
		
	}]);

///  factory
app.factory('AddFactory',function($resource){
	return $resource("/semester/add",{},{
		save : { method : 'POST'} 
	})
});
app.factory('GetAllFactory',function($resource){
	return $resource("/semester/list",{},{
		get : { method : 'GET', params : {}, isArray : false} 
	})
});

app.factory('EditFactory',function($resource){
	return $resource("/semester/:id",{},{
		edit : { method : 'GET', params : {id : ''}, isArray : false} 
	})
});

app.factory('DeleteFactory',function($resource){
	return $resource("/semester/delete/:id",{},{
		get : { method : 'DELETE', params : {id : ''}, isArray : false} 
	})
});

app.factory('UpdateFactory',function($resource){
	return $resource("/semester/update",{},{
		update : { method : 'PUT'} 
	})
});


//controller
app.controller('mainController', function($scope,$rootScope,$localStorage,$state,$timeout,growl,AddFactory,GetAllFactory,EditFactory,UpdateFactory,DeleteFactory) {

GetAllFactory.get({},function(data){
	$scope.studentMarkList=data.content;
    console.log("detail----->",data);
},function(error){
	console.log("error : ", error);
});

/*
$scope.tableParams=new ngTableParams({
	page:1 , count:10,
},{
	getData:function($defer,params){
		$scope.pagination.page = params.page() -1;
    	$scope.pagination.size = params.count();
    	$scope.pagination.customerId = $scope.user.customer.id;
    	
    	$scope.pagination.sortOrder = "desc";
		
		console.log("params.sorting() ",params.sorting());
		if (params.sorting() != null) {
			
            var orderBy = params.orderBy()[0];
          
            if(orderBy != null && orderBy != undefined){
            	$scope.pagination.sortField = orderBy.substring(1);
            	
            	$scope.pagination.sortOrder = orderBy[0] == '+' ? 'ASC' : 'DESC'
            	
            }
		}
		
    	console.log("$scope.pagination",$scope.pagination);
    	
    	OpeningBalanceHistory.post($scope.pagination).$promise.then(function(data){
		$scope.serialNumber=$scope.pagination.page*$scope.pagination.size;
		$scope.openingBalanceHistory=data.content.contents;
		console.log("$scope.openingBalanceHistory List",data.content.contents);
		$localStorage.maxFileSizeLength = data.content.fileSizeLength;
		
		$scope.data = params.sorting() ? $filter('orderBy')(data.content.contents, params.orderBy()) : data.content.contents;
		console.log("params"+params.orderBy()[0]);
		params.total(data.content.totalElements);
		
		$scope.total = data.content.totalElements;
		console.log("pagination response ",data.content.totalElements)
		console.log("total ",$scope.total)
        $defer.resolve($scope.data);
		},function(error){
			console.log("branh pagination error");
		});}
});*/







$scope.create = function(){
	$localStorage.action = "Add";
	$state.go('add');
}	


$scope.selectStudent = function(studentId){
	$localStorage.studentId = studentId ;
}

$scope.edit = function(){
	$localStorage.action = "Edit";
	console.log("$localStorage.studentId ::",$localStorage.studentId); 
	if($localStorage.studentId == "" || $localStorage.studentId == null){
		 alert("Please select the student");
		return;
	}
	$state.go('add');

}

$scope.view = function(){
	$localStorage.action = "View";	
	if($localStorage.studentId == "" || $localStorage.studentId == null){
		 alert("Please select the student");
		return;
	}
	$state.go('add');
}




$scope.deleted = function(){
	
	if($localStorage.studentId == "" || $localStorage.studentId == null){
		 alert("Please select the student");
		return;
	}
	DeleteFactory.remove({id:$localStorage.studentId},function(data){
		if(data.status == true){
			$localStorage.studentId = "";
		 console.log("delete error",data);
			$timeout(function(){ growl.success("Student record deleted Successfully"); }, 100);
		 $state.go('list',null,{reload: true});
		}
	 },function(error){
		 console.log("delete error",error);
	 });	

}


	






});

app.controller('detailController', function($scope,$rootScope,$state,$timeout,$localStorage,growl,AddFactory,GetAllFactory,EditFactory,UpdateFactory,DeleteFactory) {
	$scope.semester = {};	

	$scope.action = $localStorage.action;
	$scope.studentId = $localStorage.studentId;
	
	console.log(",$localStorage",$localStorage.action);

if($scope.action == "Edit" || $scope.action == "View"){
	EditFactory.edit({id:$scope.studentId},function(data){
    	console.log("success---------------",data);
    	$scope.semester = {};
    	$scope.semester=data.content;
    	$state.go('add');
    	
    
    },function(error)
    {
    	console.log("edit error......",error);
    });
	}
	
	$scope.markCalculate = function(semester){
		console.log("semester calculate ",semester);
		if(semester.markOne == "" || semester.markOne == null || semester.markOne == undefined ||
		  semester.markTwo == "" || semester.markTwo == null || semester.markTwo == undefined ||
		   semester.markThree == "" || semester.markThree == null || semester.markThree == undefined){
					
			semester.totalMark = null;
			semester.average = null;
		}else{
			semester.totalMark = (semester.markOne + semester.markTwo + semester.markThree);
			semester.average = semester.totalMark/3;
		}
	}
	
	
	$scope.cancel = function(){
		$localStorage.studentId = "";
		$state.go('list');

	}
	
	$scope.submit = function(){
		console.log("Student details ::::",$scope.semester);
		
		if($scope.semester.registerNumber == "" || $scope.semester.registerNumber == null){
			$timeout(function(){ alert("Please enter the Student ID"); }, 100);
			return;
		}
		
		if($scope.semester.name == "" || $scope.semester.name == null){
			$timeout(function(){ alert("Please enter the Student Name"); }, 100);
			return;
		}
		
		if($scope.semester.markOne == "" || $scope.semester.markOne == null){
			$timeout(function(){ alert("Please enter the Mark I"); }, 100);
			return;	
		}else if($scope.semester.markOne == undefined || $scope.semester.markOne > 100){
			$timeout(function(){ alert("Please enter the Mark I less than or equal to 100"); }, 100);
			return;	
		}
		
		if($scope.semester.markTwo == "" || $scope.semester.markTwo == null){
			$timeout(function(){ alert("Please enter the Mark II"); }, 100);
			return;	
		}else if($scope.semester.markTwo == undefined || $scope.semester.markTwo > 100){
			$timeout(function(){ alert("Please enter the Mark II less than or equal to 100"); }, 100);
			return;	
		}
		
		if($scope.semester.markThree == "" || $scope.semester.markThree == null){
			$timeout(function(){ alert("Please enter the Mark III"); }, 100);
			return;	
		}else if($scope.semester.markThree == undefined || $scope.semester.markThree > 100){
			$timeout(function(){ alert("Please enter the Mark III less than or equal to 100"); }, 100);
			return;	
		}
		
		
		if($scope.action == "Add"){
			AddFactory.save($scope.semester).$promise.then(function(data){
				console.log("status................",data);
				if(data.status == true){
			    	$scope.semester = {};
					$timeout(function(){ growl.success("Student Semester Mark Added successfully"); }, 100);
			    	$localStorage.studentId = "";

					$state.go('list');

				}else{
					console.log("submit status error...........", data.description);
					$timeout(function(){ alert(data.description); }, 100);

				}
				
			}, function(error){
				console.log("submit  error...........",error);
				$timeout(function(){ growl.error(data.description); }, 100);
		
			});
		}else if($scope.action == "Edit"){
			UpdateFactory.update($scope.semester).$promise.then(function(data){
				if(data.status==true){
					//$timeout(function(){ growl.success("Student Mark Updated successfully"); }, 1000);
					 growl.success("Student Semester Mark Updated successfully");
				    	$localStorage.studentId = "";

					$state.go('list');

				}else{
					console.log("submit status error...........",data.description);
					$timeout(function(){ alert(data.description); }, 100);

				}
			},
			function(error){
				console.log("submit error-------",error);
				$timeout(function(){ growl.error(data.description); }, 100);

			});
		}
		
	}
	
});
	
