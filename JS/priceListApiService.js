app.factory('priceListService',function($http){
  return {
    getBtcPrice : function(){
      return $http({
        method:'GET',
        url: "http://api.coindesk.com/v1/bpi/currentprice.json/"
      })
      .then(function(data){
        return data;
      });
    }
  }
});
