(function () {
    var app = angular.module("TodoApp", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.html",
                controller: "MainController"
            })

        .otherwise({
            redirectTo: "/main"
        });
    });
}());