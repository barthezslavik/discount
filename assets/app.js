angular.module('app', [])
  .controller('mainController', function($scope) {
    $scope.list = [];
    $scope.formData = {};

    $scope.updateList = function() {
      delete($scope.formData.name);
      delete($scope.formData.description);
      delete($scope.formData.value);
      if ($scope.formData.type.id == "gadgets") {
        $scope.current = $scope.gadgets;
      } else {
        $scope.current = []
      }
    }

    $scope.updateDescription = function() {
      $scope.formData.description = $scope.formData.name.name
      $scope.formData.value = $scope.formData.name.cost
    }

    $scope.add = function() {
      $scope.list.push($scope.data);
      delete($scope.data)
    }

    $scope.types = [
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

});
