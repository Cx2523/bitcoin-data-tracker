app.factory('priceListService',function($http,$q){
  return {
    getBtcPrice : function(){
      return $http({
        method:'GET',
        url: "http://api.coindesk.com/v1/bpi/currentprice.json/"
      })
      .then(function(data){
        return data;
      });
    },
    getHistoricalData : function(){
      return $http({
        method: 'GET',
        url: "http://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05"
      }).then(function(historicalData){
        return historicalData;
      });
    }
  }
});
