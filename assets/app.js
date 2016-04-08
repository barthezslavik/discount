angular.module('app', [])
  .controller('mainController', function($scope) {
    $scope.data = [];
    $scope.formData = {};
    var sortableElement;

    $scope.types = [
      { id: 'gadgets', name: "Gadgets" },
      { id: 'fixed_discounts', name: "Fixed discount" },
      { id: 'percent_discounts', name: "Percent discount" },
      { id: 'fees', name: "Fees" }
    ];

    $scope.data = [
      {
        description: "Gadget_221",
        cost_string: "($100 each)",
        value: 200,
        quantity: 2,
        cost: 100
      },
      {
        description: "Old Client Discount",
        cost: -20,
        cost_string: "($20)",
        is_discount: true,
        type: "value"
      },
      {
        description: "Gadget_113",
        cost_string: "($50 each)",
        discount: "(-20% = $120)",
        value: 150,
        quantity: 3,
        cost: 50,
        total_string: "<h1>11</h1>"
      },
      {
        description: "Air shipping fee",
        cost_string: "($50)",
        discount: "(-20% = $40)",
        value: 50,
        quantity: 1,
        cost: 50
      },
      {
        description: "Student Discount (20%)",
        discount: "(Total discount = -$40)",
        cost: 20,
        is_discount: true,
        type: "percent"
      },
      {
        description: "Courier fee",
        cost: 20,
        cost_string: "($20)"
      },
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
      $scope.data.push($scope.formData)
      $scope.formData = {};
    }

    $scope.sortableArray = $scope.data;

    $scope.dragStart = function(e, ui) {
      ui.item.data('start', ui.item.index());
    }

    $scope.dragEnd = function(e, ui) {
      var start = ui.item.data('start'),
      end = ui.item.index();

      $scope.sortableArray.splice(end, 0,
      $scope.sortableArray.splice(start, 1)[0]);
      $scope.findDiscounts($scope.sortableArray);
      $scope.$apply();
    }

    $scope.findDiscounts = function(array) {
      var list = [];
      angular.forEach(array, function(object, key) {
        list.push(object);
        if (object.is_discount == true) {
          $scope.applyDiscount(object, list);
          list = [];
        }
      });
    }

    $scope.applyDiscount = function(discount, list) {
      if (discount.type == "percent") {
        angular.forEach(list, function(item, key) {
          if (item.discount != true) {
            item.total_cost = item.cost*item.quantity;
            item.rest = item.total_cost - item.total_cost*(discount.cost/100);
            item.strike_string = "$" + item.total_cost + " (-"+ discount.cost +"% = $"+ item.rest +")" ;
          }
        });
      }
    }

    sortableElement = $('#sortable').sortable({
      start: $scope.dragStart,
      update: $scope.dragEnd
    });
});
