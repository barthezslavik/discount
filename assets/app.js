angular.module('app', [])
  .controller('myController', function($scope) {
    $scope.gadgets = [
      {
        name: "Gadget_221",
        cost: 100,
      },
      {
        title: "Gadget_113",
        cost: 50,
      },
    ];

    $scope.local_discounts = [
      {
        title: "Old Client Discount",
        cost: 20,
      },
    ];

    $scope.global_discounts = [
      {
        title: "Student Discount",
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