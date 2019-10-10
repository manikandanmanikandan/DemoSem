var app = angular.module('Myapp', ['ui.router','ngResource']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	
$urlRouterProvider.otherwise("team")

$stateProvider
    .state("team", {
        url:'/team',
        templateUrl: 'team.html',
        controller: 'addteam',
      })	
	
	$stateProvider
    .state("players", {
        url:'/players',
        templateUrl: 'players.html',
        controller: 'addplayers',
      })
	
	$stateProvider
    .state("matchSchedule", {
        url:'/matchSchedule',
        templateUrl: 'matchSchedule.html',
        controller: 'addmatchSchedule',
      })
	  
	$stateProvider
    .state("addteam", {
        url:'/addteam',
        templateUrl: 'addteam.html',
        controller: 'addteam',
      })	 

$stateProvider
    .state("addplayers", {
        url:'/addplayers',
        templateUrl: 'addplayers.html',
        controller: 'addplayers',
      })	
	  
	  
	  $stateProvider
    .state("addmatchSchedule", {
        url:'/addmatchSchedule',
        templateUrl: 'addmatchSchedule.html',
        controller: 'addmatchSchedule',
      })	
	  
      $stateProvider
      .state("cricketAssociate", {
          url:'/cricketAssociate',
          templateUrl: 'cricketAssociate.html',
          controller: 'cricketAssociate',
        })	
  	  
	  
	
}]);	

///  factory

app.factory('TeamAddFactory',function($resource){
	return $resource("/cricketTeam/add",{},{
		save : { method : 'POST'} 
	})
});
app.factory('TeamGetAllFactory',function($resource){
	return $resource("/cricketTeam/getAll",{},{
		get : { method : 'GET', params : {}, isArray : false} 
	})
});

app.factory('TeamEditFactory',function($resource){
	return $resource("/cricketTeam/getby/:id",{},{
		edit : { method : 'GET', params : {id : ''}, isArray : false} 
	})
});

app.factory('TeamDeleteFactory',function($resource){
	return $resource("/cricketTeam/delete/:id",{},{
		get : { method : 'DELETE', params : {id : ''}, isArray : false} 
	})
});

app.factory('TeamUpdateFactory',function($resource){
	return $resource("/cricketTeam/update",{},{
		update : { method : 'PUT'} 
	})
});



app.controller('cricketList', function($scope,$rootScope) {
	$rootScope.teams = [];
	$rootScope.count=1;
	$rootScope.team = {}; 
	
	$rootScope.players = [];
	$rootScope.count=1;
	$rootScope.player = {}; 
	
	$rootScope.matchs = [];
	$rootScope.count=1;
	$rootScope.match = {}; 
	
});


app.controller('cricketAssociate', function($scope,$rootScope) {

});


////////////Team-----------------------------------------

		app.controller('addteam', function($scope,$rootScope,$state,TeamAddFactory,TeamGetAllFactory,TeamUpdateFactory,TeamEditFactory,TeamDeleteFactory) {
			$scope.team ={};
			  $scope.team =$rootScope.team;
				$scope.errorKey = null;
			  
				TeamGetAllFactory.get({},function(data){
					$rootScope.teams=data.content;
				    console.log("detail----->",data);
				},function(error){
					console.log("error : ", error);
				});
						    
				
////Changecount
		
			$scope.changecount = function(team){
			team.benchCount = team.teamMemberCount-team.playingCount;
			}
		
		
/////add	
		
			$rootScope.addTeam =function(){
					$state.go('addteam');
			}

/////Submit

			$rootScope.submitFrom=function(team){
				console.log("team----------",team);
		
				
				if(team.id==null || team.id==undefined)
				{
					console.log(team.id);
					
						TeamAddFactory.save($scope.team).$promise.then(function(data){
							console.log("status................",data.status);
							if(data.status==true)
							{
							
								$rootScope.team={};
								$state.go('team');
							}else
							{
								console.log("submit status error...........", data.description);
								$scope.errorKey=data.description;
							}
							
						}, function(error){
							console.log("submit  error...........",error);
					
						});
				
				}else{
					
					
					TeamUpdateFactory.update($scope.team).$promise.then(function(data){
						if(data.status==true)
						{
						
						$rootScope.team={};
						$state.go('team');
						}else
						{
							console.log("submit status error...........",data.description);
						}
					},
					function(error)
					{
						console.log("submit error-------",error);
					});
					

			}	

/////Cancel

			$rootScope.cancelFrom=function(){
				$state.go('team');
			}

////edit

			$rootScope.teameditFrom=function(team){
				TeamEditFactory.edit({id:team.id},function(data){
			    	console.log("success---------------",data);
			    	$rootScope.team=team;
			    	$state.go('addteam');
			    
			    },function(error)
			    {
			    	console.log("edit error......",error);
			    });
				
			}

//////delete

			$rootScope.teamdeleteRow=function(team)
			{
				TeamDeleteFactory.remove({id:team.id},function(data){
					 console.log("delete error",data);
					 $state.go('team',null,{reload: true});
				 },function(error){
					 console.log("delete error",error);
				 });	

			}
			
			}		



});



		//players factory

		app.factory('PlayerAddFactory',function($resource){
			return $resource("/cricketPlayers/add",{},{
				save : { method : 'POST'} 
			})
		});

		app.factory('PlayersGetAllFactory',function($resource){
			return $resource("/cricketPlayers/getAll",{},{
				get : { method : 'GET', params : {}, isArray : false} 
			})
		});

		app.factory('PlayersEditFactory',function($resource){
			return $resource("/cricketPlayers/getby/:id",{},{
				edit : { method : 'GET', params : {id : ''}, isArray : false} 
			})
		});

		app.factory('PlayersDeleteFactory',function($resource){
			return $resource("/cricketPlayers/delete/:id",{},{
				get : { method : 'DELETE', params : {id : ''}, isArray : false} 
			})
		});

		app.factory('PlayersUpdateFactory',function($resource){
			return $resource("/cricketPlayers/update",{},{
				update : { method : 'PUT'} 
			})
		});






///////////player

app.controller('addplayers', function($scope,$rootScope,$state,PlayerAddFactory,PlayersGetAllFactory,PlayersUpdateFactory,PlayersEditFactory,PlayersDeleteFactory) {
	
	$scope.player ={};
	  $scope.player =$rootScope.player;
		$scope.errorKey = null;
	
		PlayersGetAllFactory.get({},function(data){
			$rootScope.players=data.content;
		    console.log("detail----->",data);
		},function(error){
			console.log("error : ", error);
		});
	
//////add
	
			$rootScope.addPlayers =function(){
					$state.go('addplayers');
			}
	
/////Submit

			$rootScope.playerSubmitFrom=function(player){
			
				if(player.id==null || player.id==undefined)
				{
			
					PlayerAddFactory.save($scope.player).$promise.then(function(data){
							console.log("status................",data.status);
							console.log("object................",$scope.player);
							if(data.status==true)
							{
							
								$rootScope.player={};
								$state.go('players');
							}else
							{
								console.log("submit status error...........", data.description);
								$scope.errorKey=data.description;
							}
							
						}, function(error){
							console.log("submit  error...........",error);
					
						});
				
				}else{
					
					
					PlayersUpdateFactory.update($scope.player).$promise.then(function(data){
						if(data.status==true)
						{
						
						$rootScope.player={};
						$state.go('players');
						}else
						{
							console.log("submit status error...........",data.description);
						}
					},
					function(error)
					{
						console.log("submit error-------",error);
					});
					

			}	
			}	

/////Cancel

			$rootScope.playerCancelFrom=function(){
				$state.go('players');
			}			
			
////edit

			$rootScope.playereditFrom=function(player){
				PlayersEditFactory.edit({id:player.id},function(data){
			    	console.log("success---------------",data);
			    	$rootScope.player=player;
			    	$state.go('addplayers');
			    
			    },function(error)
			    {
			    	console.log("edit error......",error);
			    });
				
			
			}
			
//////delete

			$rootScope.playerdeleteRow=function(player)
			{
				PlayersDeleteFactory.remove({id:player.id},function(data){
					 console.log("delete error",data);
					 $state.go('players',null,{reload: true});
				 },function(error){
					 console.log("delete error",error);
				 });	

			 
			}		
	
	
});








//schedle factory

app.factory('MatchAddFactory',function($resource){
	return $resource("/cricketMatch/add",{},{
		save : { method : 'POST'} 
	})
});

app.factory('MatchGetAllFactory',function($resource){
	return $resource("/cricketMatch/getAll",{},{
		get : { method : 'GET', params : {}, isArray : false} 
	})
});

app.factory('MatchEditFactory',function($resource){
	return $resource("/cricketMatch/getby/:id",{},{
		edit : { method : 'GET', params : {id : ''}, isArray : false} 
	})
});

app.factory('MatchDeleteFactory',function($resource){
	return $resource("/cricketMatch/delete/:id",{},{
		get : { method : 'DELETE', params : {id : ''}, isArray : false} 
	})
});

app.factory('MatchUpdateFactory',function($resource){
	return $resource("/cricketMatch/update",{},{
		update : { method : 'PUT'} 
	})
});









////////schedule

app.controller('addmatchSchedule', function($scope,$rootScope,$state,MatchGetAllFactory,MatchUpdateFactory,MatchEditFactory,MatchDeleteFactory,MatchAddFactory) {
	
		
	$scope.match ={};
	  $scope.match =$rootScope.match;
		$scope.errorKey = null;
	  
		MatchGetAllFactory.get({},function(data){
			$rootScope.matchs=data.content;
		
		},function(error)
		{
			console.log("error : ", error);
		});
		
////add

			$rootScope.addSchedule =function(){
					$state.go('addmatchSchedule');
			}
	
			
/////Submit

			$rootScope.matchScheduleSubmitFrom=function(match){
		
  
				if(match.id==null || match.id==undefined)
				{
					console.log(match.id);
					
					MatchAddFactory.save($scope.match).$promise.then(function(data){
							if(data.status==true)
							{
							
								$rootScope.match={};
								$state.go('matchSchedule');
							}else
							{
								console.log("submit status error...........", data.description);
								$scope.errorKey=data.description;
							}
							
						}, function(error){
							console.log("submit  error...........",error);
					
						});
				
				}else{
					
					
					MatchUpdateFactory.update($scope.match).$promise.then(function(data){
						if(data.status==true)
						{
						
						$rootScope.match={};
						$state.go('matchSchedule');
						}else
						{
							console.log("submit status error...........",data.description);
						}
					},
					function(error)
					{
						console.log("submit error-------",error);
					});
					

			}	
			
			}			
	
/////Cancel

			$rootScope.matchScheduleCancelFrom=function(){
				$state.go('matchSchedule');
			}		
			
////edit
			$rootScope.scheduleeditFrom=function(match){
				MatchEditFactory.edit({id:match.id},function(data){
			    	console.log("success---------------",data);
			    	$rootScope.match=match;
			    	$state.go('addmatchSchedule');
			    
			    },function(error)
			    {
			    	console.log("edit error......",error);
			    });
			
			}

//////delete
			$rootScope.scheduledeleteRow=function(match)
			{
				MatchDeleteFactory.remove({id:match.id},function(data){
					 console.log("delete error",data);
					 $state.go('matchSchedule',null,{reload: true});
				 },function(error){
					 console.log("delete error",error);
				 });	
			 
			}					
		
		
});





