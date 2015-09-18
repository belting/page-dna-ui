'use strict';

angular.module('pageDnaApp')
  .controller('MainController', ['TableService', function(TableService) {
    var $this = this;

    var getNextColumn = function(columns, current) {
      var currentIndex = columns.indexOf(current);
      if (currentIndex === -1 || currentIndex === columns.length - 1) {
        return columns[0];
      }
      return columns[currentIndex + 1];
    };

    this.onItemClick = function(row, item) {
      var nextColumn = getNextColumn($this.data.columns, row.states[item]);
      row.states[item] = nextColumn;
    };

    TableService.getData().then(function(data) {
      $this.data = data;
    });
  }]);
