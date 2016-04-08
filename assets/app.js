angular.module('app', [])
  .controller('mainController', function($scope) {
    $scope.list = [];

    $scope.update = function() {
      var name = $scope.current_type;
      $scope.current = $scope[name.id];
    }

    $scope.add = function() {
      $scope.list.push($scope.data);
      delete($scope.data)
    }

    $scope.item_types = [
      { id: 'gadgets', name: "Gadgets" },
      { id: 'fixed_discounts', name: "Fixed discount" },
      { id: 'percent_discounts', name: "Percent discount" },
      { id: 'fees', name: "Fees" }
    ];

    $scope.gadgets = [
      {
        id: 1,
        name: "Gadget_221",
        cost: 100,
      },
      {
        id: 2,
        name: "Gadget_113",
        cost: 50,
      },
    ];

    $scope.fixed_discounts = [
      {
        name: "Old Client Discount",
        cost: 20,
      },
    ];

    $scope.percent_discounts = [
      {
        name: "Student Discount",
        cost: "20",
      },
    ];

    $scope.fees = [
      {
        name: "Courier fee",
        cost: 20
      }
    ];
});
