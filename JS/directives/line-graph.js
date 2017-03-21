app.directive('ccLineGraph',function(){
  return {
    restrict:'E',
    replace: true,
    templateUrl: './JS/directives/line-graph-template.html',
    scope:{
      priceArr: '='
    },
    link: function(scope, element, attrs, controller){
      var w = 500;
      var h = 500;
      var padding = 2;
      // var testData = [100, 200, 500, 200, 300, 400];
      var scaleY;
      var svg = d3.select("svg")
                  .attr("width", w)
                  .attr("height", h);

      scope.$watchCollection('priceArr',function(v){

        scaleY =
          d3.scaleSqrt()
          .domain(
              [0,
               getMaxOfObjectProp('delta',scope.priceArr,true)])
          .range([h, 0]);

        drawBars();
      });


      function drawBars(){
        svg.selectAll("rect")
          .data(scope.priceArr)
          .attr("y", function(d){
            return scaleY(d.delta);
          })
          .attr("height", function(d){
            return h - scaleY(d.delta);
          })
          .enter()
          .append("rect")
            .attr("x", function(d,i){
              return i * w / 10;
            })
            .attr("y", function(d){
              return scaleY(d.delta);
            })
            .attr("width", w / 10 - padding)
            .attr("height", function(d){
              return h - scaleY(d.delta);
            })
            .style('fill', 'black')
              .append("text")
              .style('fill', 'black')
              .text(function(d){
                return d.btcPrice;
              });
        }

        function getMaxOfObjectProp(property, objectArr, maxmin){
          return objectArr.map(function(obj){
            return obj[property];
          }).reduce(function(accumulator, value){
            if(maxmin){
              return Math.max(accumulator, value);
            }
            else{
              return Math.min(accumulator, value);
            }
          });
        }
        //this helper function get the max or min value of a property
        //you select from an array of objects. Default is max. Set
        //maxmin to false for min.

    },
  };


});
