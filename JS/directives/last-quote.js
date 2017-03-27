app.directive('ccLastQuote',function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './JS/directives/last-quote-template.html',
    scope:{
      lastPrice: '='
    }
  }  
});
