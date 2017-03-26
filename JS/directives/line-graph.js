app.directive('ccLineGraph',function(){
  return {
    restrict:'E',
    replace: true,
    templateUrl: './JS/directives/line-graph-template.html',
    scope:{
      priceArr: '='
    },
    link: function(scope, element, attrs, controller){
      var w = 750;
      var h = 750;
      var padding = 2;
      // var testData = [100, 200, 500, 200, 300, 400];
      var scaleY;
      scaleY =
        d3.scaleLinear()
        .domain([5,-5])
        .range([0, h]);

      var svg = d3.select("svg")
                  .attr("width", w)
                  .attr("height", h);

      scope.$watchCollection('priceArr',function(v){
        drawBars();
      });

      var yAccumulator = 0;

      function drawBars(){
      svg.selectAll("rect") //don't need update phase unless scale is dynamic
          .data(scope.priceArr)
          .enter()
          .append("rect")
            .attr("x", function(d,i){
              return i * w / 10;
            })
            .attr("y", function(d){
              d.delta = +d.delta;
              d.prevDelta = +d.prevDelta;
              return scaleY(Math.max(yAccumulator, yAccumulator + d.delta));
            })
            .attr("width", w / 10 - padding)
            .transition()
            .duration(1000)
            .attr("height", function(d, i){
              d.delta = +d.delta;
              d.prevDelta = +d.prevDelta;
              yAccumulator = yAccumulator + d.delta
              return scaleY(Math.min(yAccumulator, yAccumulator + d.delta)) - scaleY(Math.max(yAccumulator, yAccumulator + d.delta));
            })
            .attr("fill",function(d){
              if(d.delta < 0){
                return "red";
              }
              else if (d.delta > 0){
                return "green";
              }
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
