angular.module('app', [])
  .controller('mainController', function($scope) {
    $scope.add = function() {
      $("form").show();
    }

    $scope.gadgets = [
      {
        name: "Gadget_221",
        cost: 100,
      },
      {
        name: "Gadget_113",
        cost: 50,
      },
    ];

    $scope.local_discounts = [
      {
        name: "Old Client Discount",
        cost: 20,
      },
    ];

    $scope.global_discounts = [
      {
        name: "Student Discount",
        cost: "20%",
      },
    ];

    $scope.fees = [
      {
        name: "Courier fee",
        cost: 20
      }
    ];
});
