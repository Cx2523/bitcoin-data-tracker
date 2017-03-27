app.directive('ccWaterfallChart',function(){
  return {
    restrict:'E',
    replace: true,
    templateUrl: './JS/directives/waterfall-chart-template.html',
    scope:{
      priceArr: '='
    },
    link: function(scope, element, attrs, controller){
      var w = 450;
      var h = 400;
      var axisPadding = 30;
      var barPadding = 2;
      // var testData = [100, 200, 500, 200, 300, 400];
      var scaleY = d3.scaleLinear()
        .domain([5,-5])
        .range([10, h - 10]);

      var yAxisDelta = d3.axisLeft()
         .scale(scaleY);

      var svg = d3.select("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .append("g")
                  .call(yAxisDelta)
                    .attr("transform", "translate(" + axisPadding + ",0)")
                    .attr("class", "axis");

      var yAccumulator = 0;

      scope.$watchCollection('priceArr',function(v){
        drawBars();
      });



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
            .attr("width", w / 10 - barPadding)
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
                return "#F79695";
              }
              else if (d.delta > 0){
                return "#A0CE7F";
              }
            });
        }

    },
  };


});
