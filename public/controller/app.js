    var myApp = angular.module('myApp', ["ngRoute"]);  
   

    myApp.controller('productsCtrl', function($scope, $http ) {
         angular.module('myApp')
        .config(function ($httpProvider, $httpParamSerializerJQLikeProvider){
        $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get());
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    });
            $scope.active = true;

              $scope.loadInitialproducts = function(){  
                    $scope.active = true;
                    $http.get('/products').then(function(d){
                        $scope.productsdata = d.data;
                        //console.log(d);
                        console.log('Loaded all documents');
                    });
            };

            $scope.loadProduct = function(id){
                $scope.active = false;

                $scope.productsdata = {};
                $http.get('/products/'+id).then(function(d){
                    $scope.inidData = d.data;
                    //console.log(d);
                    console.log('Loaded product data');
                });
            };

            $scope.back = function(){
                $scope.loadInitialproducts();
             };
            $scope.displayTime = function(time){
                
                return time;
            };
            $scope.loadInitialproducts();
            
            $scope.submitComments = function(id){
                var data = ({
                    comment : $scope.comments,
                    email : $scope.email , 
                    stars : $scope.stars 
                });
                console.log(data);
                  var transform = function(data){
                        return $.param(data);
                     }   
                /*$http({
                      method  : 'POST',
                      url     : '/product/'+ id ,
                      data: data
                      //data    : $httpParamSerializerJQLike(data) , // pass in data as strings
                     // headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                      //transformRequest: transform
                })*/
                $http.post('/product/'+ id , $.param(data),{ headers:
                                    {
                                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }} )
                .success(function(s){

                    if(!s.failed){
                        $scope.loadProduct(id);
                        console.log("daata = " + data);
                        console.log("suucessfull post");
                    }
                    else{
                        $scope.errorPlace = "Error occured. could not submit";
                    }
                
                });
            };
    });
