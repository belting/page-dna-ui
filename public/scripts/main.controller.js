'use strict';

angular.module('pageDnaApp')
  .controller('MainController', ['TableService', function(Table) {
    var $this = this;

    this.columnNamePattern = /^[A-F,N-Z]{1}(-\d{4})?$/;

    this.onItemClick = function(row, item) {
      var currentColumn = row.states[item];
      var nextColumn = Table.getNextColumnName(currentColumn);
      Table.swapItem(item, row, currentColumn, nextColumn);
    };

    this.onNewColumnSubmit = function() {
      var isUnique = Table.listColumnNames().indexOf(this.newColumnName) === -1;
      this.newColumnForm.$setValidity('unique', isUnique);

      if (this.newColumnForm.$valid) {
        Table.addColumn(this.newColumnName);
        this.newColumnName = '';
        this.newColumnForm.$setPristine();
      }
    };

    Table.initData().then(function(data) {
      $this.data = data;
    });
  }]);
