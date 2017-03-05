app.controller('priceListCTRL',function($scope,$interval,priceListService){

  var timer, x;
  $scope.priceArr = [];
  $scope.nextQuoteTime = 60;
/////call api and initialize 1st price object in array
  function getInitialPrice(){
      priceListService.getBtcPrice().then(function(btcPrice){
        $scope.priceArr.push(
          new NextPrice(btcPrice, parsePrice(btcPrice.data.bpi.USD.rate))
        );
      timer = $interval(countDown, 100);
    });
  }
/////call api, construct new price object, and push to array
  function getNewPrice() {
    priceListService.getBtcPrice().then(function(btcPrice){
      $scope.priceArr.push(
        new NextPrice(btcPrice, $scope.priceArr[length].btcPrice)
      );
      $interval.cancel(timer);
      timer = $interval(countDown, 100);
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
      if($scope.nextQuoteTime < 0){
        // console.log($scope.nextQuoteTime);
        $scope.nextQuoteTime = 60;
      }
      else {
        // console.log($scope.nextQuoteTime);
        $scope.nextQuoteTime = $scope.nextQuoteTime - .1;
      }
  }

  getInitialPrice();
  var quoteTimer = setInterval(getNewPrice,60000);


});
