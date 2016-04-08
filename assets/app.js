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

    $scope.addItem = function() {
      $scope.data.push($scope.formData)
      $scope.formData = {};
      $scope.sortableArray = $scope.data;
      $scope.setValues($scope.sortableArray);
      $scope.findDiscounts($scope.sortableArray);
      $scope.calculateTotal();
    }

    var sortableElement;

    $scope.add = function() {
      $scope.sortableArray.push('Item: '+$scope.sortableArray.length);
      sortableElement.refresh();
    }

    $scope.sendInvoice = function() {
      $.ajax({
        type: "POST",
        url: "saveinvoice",
        contentType: 'application/json',
        data: JSON.stringify($scope.sortableArray)
      });
    }

    $scope.setValues = function(data) {
      angular.forEach(data, function(object, key) {
        object.cost = Number(object.cost);
        if (object.quantity == undefined) object.quantity = 1;
        object.total_cost = object.quantity*object.cost;
        object.rest = object.total_cost;

        if (object.type.id == "fixed_discounts") {
          object.total_cost = object.total_cost*(-1);
          object.rest = object.total_cost;
        }

        if (object.type.id == "percent_discounts") {
          object.rest = 0;
        }

        $scope.decorate(object);
      });
    }

    $scope.decorate = function(object) {
      if (object.type.id == "percent_discounts") {
        object.cost_string = "("+object.cost+"%)";
      }
      if (object.type.id != "percent_discounts") {
        object.rest = object.total_cost;
        object.total_cost_string = "$"+object.total_cost;

        if (object.type.id == "fixed_discounts") {
          object.total_cost_string = "-$"+object.total_cost*(-1);
        }

        if (object.quantity > 1) {
          object.cost_string = "($"+object.cost+" each)";
        } else {
          object.cost_string = "($"+object.cost+")";
        }
      }
    }

    $scope.calculateTotal = function() {
      $scope.total = 0;
      angular.forEach($scope.sortableArray, function(object, key) {
        $scope.total += object.rest;
      });
      if ($scope.total < 0) {
        $scope.total = "-$"+$scope.total*(-1);
      } else {
        $scope.total = "$"+$scope.total;
      }
    }

    $scope.resetValues = function() {
      angular.forEach($scope.sortableArray, function(object, key) {
        $scope.decorate(object);
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
      $scope.resetValues();
      $scope.findDiscounts($scope.sortableArray);
      $scope.calculateTotal();
      $scope.$apply();
    }

    $scope.findDiscounts = function(array) {
      var list = [];
      angular.forEach(array, function(object, key) {
        if (object.type.id == "percent_discounts") {
          $scope.applyDiscount(object, list);
          list = [];
        } else {
          if (object.type.id != "fixed_discounts") {
            list.push(object);
          }
        }
      });
    }

    $scope.applyDiscount = function(discount, list) {
      var total_discount = 0
      angular.forEach(list, function(item, key) {
        item.total_cost = item.cost*item.quantity;
        item.rest = item.total_cost - item.total_cost*(discount.cost/100);
        item.total_cost_string = "$" + item.total_cost + " (-"+ discount.cost +"% = $"+ item.rest +")" ;
        total_discount += (item.total_cost - item.rest);
      });
      discount.total_cost_string = "(Total discount: -$"+ total_discount +")"
    }

    sortableElement = $('#sortable').sortable({
      start: $scope.dragStart,
      update: $scope.dragEnd
    });
});
