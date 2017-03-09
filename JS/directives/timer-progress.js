app.directive('ccTimerBar',function(){
return {
    restrict: 'E',
    templateUrl: './JS/directives/timer-template.html',
    scope:{
      nextQuoteTime: "="
    }
  };
});
