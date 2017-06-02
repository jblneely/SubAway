var app = angular.module('TaskApp', ['ui.router', 'TaskCtrls']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/404');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/views/home.html',
                    controller: 'HomeCtrl'
                })
                .state('allTask', {
                    url: '/tasks/',
                    templateUrl: 'app/views/tasks.html',
                    controller: 'ShowAllCtrl'
                })
                .state('newTask', {
                    url: '/tasks/new',
                    templateUrl: 'app/views/newTask.html',
                    controller: 'NewCtrl'
                })
                .state('taskShow', {
                    url: '/tasks/:id',
                    templateUrl: 'app/views/showTask.html',
                    controller: 'ShowCtrl'
                })
                .state('newUserTask', {
                  url: '/newusertask',
                  templateUrl: 'app/views/newUserTask.html',
                  controller: 'NewUserCtrl'
                })
                .state('userTask', {
                    url: '/usertask/:id',
                    templateUrl: 'app/views/usertask.html',
                    controller: 'ShowAllCtrl'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'app/views/userSignup.html',
                    controller: 'SignupCtrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/views/userLogin.html',
                    controller: 'LoginCtrl'
                })
                .state('404', {
                    url: '/404',
                    templateUrl: 'app/views/404.html'
                })
                .state('chart', {
                    url: '/chart/:id',
                    templateUrl: 'app/views/chart.html',
                    controller: 'LineCtrl'
                });


            $locationProvider.html5Mode(true);
        }
    ])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);
