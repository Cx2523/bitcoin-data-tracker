var app = angular.module('app',[]);

app.controller('mainCTRL',function($scope,mainService){

  $scope.priceArr = [];

/////call api and initialize 1st price object in array
  function getInitialPrice(){
    mainService.getBtcPrice().then(function(btcPrice){
      $scope.priceArr.push(
        new NextPrice(btcPrice, parsePrice(btcPrice.data.bpi.USD.rate))
      );
    });
  }
/////call api, construct new price object, and push to array
  function getNewPrice() {
    mainService.getBtcPrice().then(function(btcPrice){
      $scope.priceArr.push(
        new NextPrice(btcPrice, $scope.priceArr[length].btcPrice)
      );
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

  getInitialPrice();
  setInterval(getNewPrice,60000);

});
