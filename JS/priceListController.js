app.controller('priceListCTRL',function($scope,$interval,priceListService){

  var timer;
  var reset = false;
  $scope.priceArr = [];
  $scope.nextQuoteTime = 60;
/////call api and initialize 1st price object in array
  function getInitialPrice(){
      timer = $interval(countDown, 10);
      priceListService.getBtcPrice().then(function(btcPrice){
        $scope.priceArr.push(
          new NextPrice(btcPrice, parsePrice(btcPrice.data.bpi.USD.rate))
        );
    });
  }
/////call api, construct new price object, and push to array
  function getNewPrice() {
    $interval.cancel(timer);
    reset = !reset;
    $scope.nextQuoteTime = "..."
    priceListService.getBtcPrice().then(function(btcPrice){
      $scope.priceArr.push(
        new NextPrice(btcPrice, $scope.priceArr[length].btcPrice)
      );
      timer = $interval(countDown, 10);
    });
  }
/////Change color class based on delta
  function colorChange(delta){
    if(delta < 0 ){
      return "red";
    }
    else if(delta > 0 ){
      return "green";
    }
    else {
      return "yellow";
    }
  }
/////parse price string to float
  function parsePrice(price){
    return parseFloat(price.replace(",","")).toFixed(4);
  }
/////Constructor for price objects
  function NextPrice(newPriceObj,oldPrice){
    this.btcPrice = parsePrice(newPriceObj.data.bpi.USD.rate);
    this.btcPricePrev = oldPrice;
    this.delta = this.btcPrice - this.btcPricePrev;
    this.deltaClass = colorChange(this.delta);
    this.timeStamp = new Date();
  }
/////Countdown timer
  function countDown(){
      if (!reset){
        $scope.nextQuoteTime = 60;
        reset = !reset;

      }
      else {
        $scope.nextQuoteTime = ($scope.nextQuoteTime - .01).toFixed(2);
      }
  }

  getInitialPrice();
  setInterval(getNewPrice,60000);


});
