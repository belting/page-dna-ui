'use strict';

angular.module('pageDnaApp')
  .service('TableService', ['$http', '$q', 'config', function($http, $q, config) {

    var getColumns = function(rows) {
      var columns = [];
      console.log(rows);
      rows.forEach(function(row) {
        var states = row.states;
        Object.keys(states).forEach(function(key) {
          if (columns.indexOf(states[key]) === -1) {
            columns.push(states[key]);
          }
        });
      });
      return columns;
    };

    this.getData = function() {
      return $q(function(resolve, reject) {
        $http.get(config.rowsUrl).then(function(response) {
          var rows = response.data;
          var data = {
            columns: getColumns(rows),
            rows: rows
          };
          resolve(data);
        }, reject);
      });
    };

  }]);
