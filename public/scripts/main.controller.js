'use strict';

angular.module('pageDnaApp')
  .controller('MainController', ['$modal', '$rootScope', 'TableService', function($modal, $rootScope, Table) {
    var $this = this;

    this.columnNamePattern = /^[A-F,N-Z]{1}(-\d{1,4})?$/;

    this.addColumn = function() {
      var isUnique = Table.listColumnNames().indexOf(this.newColumnName) === -1;
      this.newColumnForm.$setValidity('unique', isUnique);

      if (this.newColumnForm.$valid) {
        Table.addColumn(this.newColumnName);
        this.newColumnName = '';
        this.newColumnForm.$setPristine();
      }
    };

    this.moveItem = function(row, item) {
      var currentColumn = row.states[item];
      var nextColumn = Table.getNextColumnName(currentColumn);
      Table.swapItem(item, row, currentColumn, nextColumn);
    };

    this.viewJson = function() {
      var modalScope = $rootScope.$new();
      modalScope.json = JSON.stringify(this.table.rows, function(key, value) {
        if (key.substring(0, 2) == '$$') {
          return undefined;
        }
        return value;
      }, 2);

      $modal.open({
        templateUrl: '/partials/modal.html',
        scope: modalScope
      });
    };

    Table.initData().then(function(tableData) {
      $this.table = tableData;
    });
  }]);
