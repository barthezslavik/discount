angular.module('app', [])
  .controller('mainController', function($scope) {
    $scope.data = [];
    $scope.formData = {};

    $scope.types = [
      { id: 'gadgets', name: "Gadgets" },
      { id: 'fixed_discounts', name: "Fixed discount" },
      { id: 'percent_discounts', name: "Percent discount" },
      { id: 'fees', name: "Fees" }
    ];

    $scope.data = [
      { description: "Gadget_221", each_cost: "($100 each)", value: 200, quantity: 2, cost: 100},
      { description: "Old Client Discount", each_cost: "($20)", value: 200, quantity: 2, cost: 100},
      { description: "Gadget_113", each_cost: "($50 each)", discount: "(-20% = $120)", value: 150, quantity: 3, cost: 50},
      { description: "Air shipping fee", each_cost: "($50)", discount: "(-20% = $40)", value: 50, quantity: 1, cost: 50},
      { description: "Student Discount (20%)", discount: "(Total discount = -$40)"},
      { description: "Courier fee", each_cost: "($20)"},
    ]

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

    $scope.updateList = function() {
      delete($scope.formData.name);
      delete($scope.formData.description);
      delete($scope.formData.value);
      delete($scope.formData.quantity);

      if ($scope.formData.type.id == "gadgets") {
        $scope.current = $scope.gadgets;
      } else {
        $scope.current = [];
      }
    }

    $scope.updateDescription = function() {
      $scope.formData.description = $scope.formData.name.name;
      $scope.formData.value = $scope.formData.name.cost;
    }

    $scope.add = function() {
      $scope.formData.cost = $scope.formData.name.cost;
      $scope.count_discount();
      $scope.formData = {};
    }

    $scope.count_discount = function() {
      $scope.data.push($scope.formData)
    }

    var sortableEle;

    $scope.sortableArray = [
      'One', 'Two', 'Three'
    ];

    $scope.add = function() {
      $scope.sortableArray.push('Item: '+$scope.sortableArray.length);
      sortableEle.refresh();
    }

    $scope.dragStart = function(e, ui) {
      ui.item.data('start', ui.item.index());
    }

    $scope.dragEnd = function(e, ui) {
      var start = ui.item.data('start'),
      end = ui.item.index();

      $scope.sortableArray.splice(end, 0,
      $scope.sortableArray.splice(start, 1)[0]);

      $scope.$apply();
    }

    sortableEle = $('#sortable').sortable({
      start: $scope.dragStart,
      update: $scope.dragEnd
    });
});
