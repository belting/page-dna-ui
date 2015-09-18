'use strict';

angular.module('pageDnaApp')
  .service('TableService', ['$http', '$q', 'config', function($http, $q, config) {
    var tableData;

    var buildColumns = function(rows) {
      var columnNames = [];
      var columns = [];
      rows.forEach(function(row) {
        var states = row.states;
        Object.keys(states).forEach(function(key) {
          var name = states[key];
          var columnIndex = columnNames.indexOf(states[key]);
          if (columnIndex === -1) {
            columnNames.push(name);
            columns.push({
              name: name,
              count: 1
            });
          } else {
            columns[columnIndex].count++;
          }
        });
      });
      return columns;
    };

    var getColumn = function(name) {
      return tableData.columns[getColumnIndex(name)];
    };

    var getColumnIndex = function(name) {
      for (var i = 0; i < tableData.columns.length; i++) {
        if (tableData.columns[i].name === name) {
          return i;
        }
      }
      return -1;
    };

    this.addColumn = function(name) {
      tableData.columns.push({
        name: name,
        count: 0
      });
    };

    this.getNextColumnName = function(currentName) {
      var currentIndex = getColumnIndex(currentName);
      if (currentIndex === -1 || currentIndex === tableData.columns.length - 1) {
        return tableData.columns[0].name;
      }
      return tableData.columns[currentIndex + 1].name;
    };

    this.initData = function() {
      return $q(function(resolve, reject) {
        $http.get(config.rowsUrl).then(function(response) {
          var rows = response.data;
          tableData = {
            columns: buildColumns(rows),
            rows: rows
          };
          resolve(tableData);
        }, reject);
      });
    };

    this.listColumnNames = function() {
      return tableData.columns.map(function(column) {
        return column.name;
      });
    };

    this.swapItem = function(item, row, fromColumn, toColumn) {
      row.states[item] = toColumn;
      getColumn(fromColumn).count--;
      getColumn(toColumn).count++;
    };

  }]);
