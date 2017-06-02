angular.module('TaskCtrls', ['TaskServices'])

.controller('HomeCtrl', ['$scope', 'Task', function($scope, Task) {
        $scope.tasks = [];

        Task.query(function success(data) {
            $scope.tasks = data;
        }, function error(data) {
            console.log(data);
        });

        $scope.deleteTask = function(id, tasksIdx) {
            Task.delete({ id: id }, function success(data) {
                $scope.tasks.splice(tasksIdx, 1);
            }, function error(data) {
                console.log(data);
            });
        };

    }])
    .controller('ShowCtrl', ['$scope', '$stateParams', 'Task', function($scope, $stateParams, Task) {
        console.log('show controller');
        $scope.tasks = {};

        Task.get({ id: $stateParams.id }, function success(data) {
          console.log('data from Task.get', data);
            $scope.tasks = data;
        }, function error(data) {
            console.log(data);
        });
        $scope.deleteTask = function(id, tasksIdx) {
            Task.delete({ id: id }, function success(data) {
                $scope.tasks.splice(tasksIdx, 1);
            }, function error(data) {
                console.log(data);
            });
        };

    }])
    .controller('ShowAllCtrl', ['$scope', 'Task', '$location', 'Auth', '$http', function($scope, Task, $location, Auth, $http) {
        console.log('showall controller');
        $scope.tasks = [];
        var user = Auth.currentUser();
        console.log(user.id);

        $http.get('/api/users/' + user.id).then(function success(data) {
            console.log('data', data.data.subscriptions);
            $scope.user = data.data.subscriptions;
        }, function error(data) {
            console.log(data);
        });


        //CREATE
        $scope.completedTask = function(name, tasksIdx) {
            console.log('checking completed on task db');
            Task.put({ id: user.id, taskName: name }, function(task) {
                // console.log('line 51 controllers, completed task');
                $location.path('/tasks/new');
            }, function error(data) {
                console.log("error", data);
            });
        };

        $scope.deleteTask = function(name, tasksIdx) {
            Task.delete({ id: id }, function success(data) {
                $scope.tasks.splice(tasksIdx, 1);
            }, function error(data) {
                console.log(data);
            });
        };
    }])
    .controller('NewCtrl', ['$scope', '$location', 'Task', function($scope, $location, Task) {
        console.log('new controller');
        $scope.task = {
            title: '',
            image: ''
        };

        $scope.createTask = function() {
            Task.save($scope.task, function success(data) {
                $location.path('/tasks/');
            }, function error(data) {
                console.log(data);
            });
        };
    }])
    .controller('NewUserCtrl', ['$scope', '$location', 'User', '$http', 'Auth', function($scope, $location, User, $http, Auth) {
        console.log('new user controller');

        $scope.user = {
            title: '',
            description: '',
            image: ''
        };

        $scope.createUserTask = function() {
            $http.post('/api/users/newusertask', {
              userId: Auth.currentUser().id,
              title: $scope.user.subscription.title,
              description: $scope.user.subscription.description,
              dueDate: $scope.user.subscription.dueDate,
              image: $scope.user.subscription.image,
              price: $scope.user.subscription.price,
              useScore: $scope.user.subscription.useScore,
              canceledDate: $scope.user.subscription.canceledDate,
              completed: $scope.user.subscription.completed
            }).then(function success(data) {
                console.log('success', data);
            }, function error(data) {
                console.log('fail', data);
            });
            $location.path('/usertask/');
        };
    }])
    .controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
        $scope.user = Auth.currentUser();

        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        };

        $scope.logout = function() {
            Auth.removeToken();
            $location.path('/');
        };
    }])

.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userSignup = function() {
            $http.post('/api/users', $scope.user).then(function success(res) {
                console.log('successfully created a new user', res);
                $location.path('/'); //relocate to the home page
            }, function error(res) {
                console.log('Error while signing up', res);
            });
        };
    }])
    .controller('LoginCtrl', ['$scope', '$timeout', 'Auth', '$http', '$location', 'Alerts', function($scope, $timeout, Auth, $http, $location, Alerts) {
        $scope.user = {
            email: '',
            password: ''
        };
        var clearAlerts = function() {
            Alerts.clear();
        };

        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                console.log('response from server when loggin in:', res);
                Auth.saveToken(res.data.token);
                Alerts.add('success', 'You are now logged in, congrats.');
                $timeout(clearAlerts, 1500);
                $location.path('/'); //redirect to home
            }, function error(res) {
                console.log('Something went wrong', res);
                Alerts.add('error', 'Bad Login Info, Please Try Again!!');
                $timeout(clearAlerts, 1500);
            });
        };
    }])

.controller('AlertsController', ['$scope', 'Alerts', function($scope, Alerts) {
    $scope.alerts = function() {
        return Alerts.get();
    };
}])

// .controller("LineCtrl", ['$scope', 'Auth', 'Task', '$http', '$stateParams', function($scope, Auth, Task, $http, $stateParams) {


var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{
      backgroundColor: [
        "#2ecc71",
        "#3498db",
        "#95a5a6",
        "#9b59b6",
        "#f1c40f",
        "#e74c3c",
        "#34495e"
      ],
      data: [12, 19, 3, 17, 28, 24, 7]
    }]
  }
});

// var ctx = document.getElementById("myBarChart").getContext('2d');
// var myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ["M", "T", "W", "R", "F", "S", "S"],
//     datasets: [{
//       label: 'apples',
//       data: [12, 19, 3, 17, 28, 24, 7]
//     }, {
//       label: 'oranges',
//       data: [30, 29, 5, 5, 20, 3, 10]
//     }]
//   }
// });

// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
//     datasets: [{
//       label: 'apples',
//       data: [12, 19, 3, 17, 6, 3, 7],
//       backgroundColor: "rgba(153,255,51,0.6)"
//     }, {
//       label: 'oranges',
//       data: [2, 29, 5, 5, 2, 3, 10],
//       backgroundColor: "rgba(255,153,0,0.6)"
//     }]
//   }
// });





//     $http.get('/api/tasks/usertasks/' + $stateParams.id).then(function success(res) {
//         console.log('okay', res.data.user);
//         //Stuff goes here
//         //for loop to create taskDataFromDB object
//         // var taskDataFromDB = [{ tasks: 5, date: '05/22/17' },
//         //     { tasks: 8, date: '05/23/17' },
//         //     { tasks: 11, date: '05/24/17' },
//         //     { tasks: 7.75, date: '05/25/17' },
//         //     { tasks: 5, date: '05/26/17' },
//         //     { tasks: 6, date: '05/27/17' },
//         //     { tasks: 8.5, date: '05/28/17' }
//         // ];
//         console.log('in the line controller');
//         var taskObj = {};
//         var baselineArray = [];
//         var dateArray = [];
//         var numberArray = [];
//         res.data.user.completedTask.forEach(function(dataPoint) {
//             var strDate = formatDate(new Date(dataPoint.completedDate)).toString();
//             if(taskObj[strDate]){
//               taskObj[strDate] += 1;
//             }
//             else{
//               taskObj[strDate] = 1;
//               baselineArray.push(10);
//             }
//         });
//         console.log(taskObj);

//         for(var key in taskObj) {
//             dateArray.push(formatDate(new Date(Date.parse(key))));
//             numberArray.push(taskObj[key]);
//         }

//         var tasks = [{
//             label: 'Baseline',
//             data: baselineArray,
//             backgroundColor: [
//                 'rgba(255,255,255, 0.4)'
//             ]
//         },{
//             label: 'Tasks Completed',
//             data: numberArray,
//             backgroundColor: [
//                 'rgba(0, 255, 255, 1)'
//             ]
//         }];

//         var ctx = document.getElementById("line").getContext('2d');

//         var line = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: dateArray,
//                 datasets: tasks
//             }
//         });

//         //Doughnut Chart

//         var ctx2 = document.getElementById("myChart").getContext('2d');
//         var myChart = new Chart(ctx2, {
//             type: 'doughnut',
//             data: {
//                 labels: ["Current", "Goal"],
//                 datasets: [{
//                     backgroundColor: ['rgba(0, 255, 255, 1)',
//                         'rgba(255,255, 255, 0.4)'
//                     ],
//                     data: [numberArray[numberArray.length - 1], 10 - numberArray[numberArray.length - 1]]
//                 }]
//             }
//         });
//     }, function err(res) {
//         console.log('error', res);
//     });
// }]);

// function formatDate(dateToFormat) {
//     console.log('type of completed date', typeof dateToFormat);
//     var dd = dateToFormat.getDate();
//     var mm = dateToFormat.getMonth() + 1; //January is 0!
//     var yyyy = dateToFormat.getFullYear();
//     return mm + '/' + dd + '/' + yyyy;
// }

