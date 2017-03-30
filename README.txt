This is an Angular JS app which tracks the bitcoin price change every minute and displays that information in a data dashboard.

If you git clone this and run ```npm start```, the app will start in your browser on port 8080.

The app features some custom Angular directives cc-price-list, cc-last-quote, cc-timer-bar, and cc-waterfall-chart to modularize the features of the dashboard.

cc-waterfall-chart uses d3.js to create a chart that shows the changes in the bitcoin price over time.

In Progress:

Creating a d3 line graph directive to display the historical bitcoin price up to the current day in the bottom panel.

Updating the d3 code for the waterfall chart to make the scales dynamic.

Additional css styling.
