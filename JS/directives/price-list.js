app.directive('ccPriceList',function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './JS/directives/price-list-template.html',
    scope:{
      priceArr: '=',
      sortParam: '='
    }
  };
});
