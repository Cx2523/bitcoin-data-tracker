app.controller('priceListCTRL',function($scope,$interval,priceListService){

/////initialize
  var timer, oldPrice;
  var identifier = 1;
  var reset = false;
  $scope.priceArr = [];
  $scope.nextQuoteTime = 60;
  $scope.sortParam = "-timeStamp";

  getInitialPrice();

  setInterval(getNewPrice,60000);

/////call api and initialize 1st price object in array
  function getInitialPrice(){
      timer = $interval(countDown, 10);
      priceListService.getBtcPrice().then(function(btcQuote){
        $scope.priceArr.push(
          {
            btcPrice : parsePrice(btcQuote.data.bpi.USD.rate),
            btcPricePrev : null,
            delta : 0,
            prevDelta : null,
            deltaClass : "yellow",
            timeStamp : new Date(),
            identifier : "price0"
          }
        );
        $scope.disclaimer = btcQuote.data.disclaimer;
        $scope.lastPrice = $scope.priceArr[0];
      });
    }
/////call api, construct new price object, and push to array
  function getNewPrice() {
    $interval.cancel(timer);
    reset = !reset;
    $scope.nextQuoteTime = "..."
    priceListService.getBtcPrice().then(function(btcQuote){
      oldPriceObj = $scope.priceArr[$scope.priceArr.length - 1];
      $scope.priceArr.push(
        new NextPrice(btcQuote, oldPriceObj)
      );
      timer = $interval(countDown, 10);
      $scope.lastPrice = $scope.priceArr[$scope.priceArr.length - 1];
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
  function NextPrice(newPriceObj,oldPriceObj){
    this.btcPrice = parsePrice(newPriceObj.data.bpi.USD.rate);
    this.btcPricePrev = parsePrice(oldPriceObj.btcPrice);
    this.delta = (this.btcPrice - this.btcPricePrev).toFixed(4);
    this.prevDelta = oldPriceObj.delta;
    this.deltaClass = colorChange(this.delta);
    this.timeStamp = new Date();
    this.identifier = "price" + identifier;
    identifier++;
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




});
