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
      delete($scope.formData.quantity);

      if ($scope.formData.type.id == "gadgets") {
        $scope.current = $scope.gadgets;
      } else {
        $scope.current = [];
      }
    }

    $scope.updateDescription = function() {
      $scope.formData.description = $scope.formData.name.name;
      $scope.formData.cost = $scope.formData.name.cost;
    }

    $scope.add = function() {
      $scope.data.push($scope.formData)
      $scope.formData = {};
      $scope.sortableArray = $scope.data;
      $scope.setValues($scope.sortableArray);
    }

    $scope.setValues = function(data) {
      $scope.total = 0;

      angular.forEach(data, function(object, key) {
        object.cost = Number(object.cost);
        if (object.quantity == undefined) object.quantity = 1;
        if (object.type.id == "fixed_discounts") object.is_discount = true;

        object.total_cost = object.quantity*object.cost;
        object.total_cost_string = "$"+object.total_cost;

        if (object.is_discount) {
          object.total_cost_string = "-$"+object.total_cost;
          object.total_cost = object.total_cost*(-1);
        }

        if (object.quantity > 1) {
          object.cost_string = "($"+object.cost+" each)";
        } else {
          object.cost_string = "($"+object.cost+")";
        }

        $scope.total += object.total_cost;
      });
    }

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
          object.total_cost = object.cost;
          $scope.applyDiscount(object, list);
          list = [];
        }
      });
    }

    $scope.applyDiscount = function(discount, list) {
      if (discount.type == "percent") {
        discount.total_cost = 0;
        angular.forEach(list, function(item, key) {
          if (item.is_discount != true) {
            item.total_cost = item.cost*item.quantity;
            item.rest = item.total_cost - item.total_cost*(discount.cost/100);
            item.strike_string = "$" + item.total_cost + " (-"+ discount.cost +"% = $"+ item.rest +")" ;
            total_discount = (item.total_cost - item.rest);
            discount.total_cost += total_discount;
          }
        });
      }
    }

    sortableElement = $('#sortable').sortable({
      start: $scope.dragStart,
      update: $scope.dragEnd
    });
});
