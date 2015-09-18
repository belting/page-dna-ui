'use strict';

angular.module('pageDnaApp')
  .controller('MainController', ['TableService', function(Table) {
    var $this = this;

    this.onItemClick = function(row, item) {
      var currentColumn = row.states[item];
      var nextColumn = Table.getNextColumnName(currentColumn);
      Table.swapItem(item, row, currentColumn, nextColumn);
    };

    Table.initData().then(function(data) {
      $this.data = data;
    });
  }]);
