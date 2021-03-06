# Cryptocurrency Data Analysis
## Objective
Make a single page web application with the following base requirements:
- a data-table showing the contents of the API calls.
- a query module with filters which enable the user to query a subset of the above datable.
- minimum of one graph visualization of the data represented in the data table (ensure that the data is graphable).
![Crypto](public/img/crypto.png)
## Tech Approach
The first step was to contemplate the design. I wanted the app to be simple and efficient without excessive plugins or repeated code. I went with Bootstrap for easy templating and then jQuery and AJAX to fetch the data from the API and display it to the DOM. The boilerplate consists of a public folder that holds the static files such as images and the CSS file as well as the HTML and JavaScript files. Even though this is a single page app, I decided to go ahead and make my own server with Express and Node. This is a very basic server that uses Express to render home page. This application is also mobile responsive to most devices.
### Making the Data Table
The API I chose for this application was https://www.worldcoinindex.com/apiservice. This API has a vast amount of data with multiple key/value pairs to make graph rendering possible. This API requires a key to access the data and the key is attained through their website. This API has four different queryURLs and I used three out of the four.

All the calls are "GET" requests and for the first queryURL it fetches specific tickers and returns the ticker label, name, price, volume and timestamp. Once the API call is made, it then takes a function that passes the response. That function then calls createRow, renderChart, and renderBubble functions and passes the response to each of them. The createRow function takes in the response, loops over the data, plugs in the data to the table data row, and appends that row to the table.  
```javascript
const createRow = res => {
  const data = res.Markets;
  for (let i = 0; i < data.length; i++) {
    let newRow = $("<tr>").append(
      $("<td>").text(data[i].Label),
      $("<td>").text(data[i].Name),
      $("<td>").text(data[i].Price),
      $("<td>").text(data[i].Volume_24h),
      $("<td>").text(moment.unix(data[i].Timestamp).format("lll"))
    );
    $("#table-data").append(newRow);
  }
};
```
The timestamp is returned as unix timestamp from the API. Use moment.js to convert that time to a readable time such as, "April 24, 2019 4:45 PM". The other functions mentioned are for the bar graph and the bubble graph.
###  Graphs
![Graphs](public/img/cryptoGraphs.png)
To render the graphs, use Chart.js. Chart.js is a great resource that displays beautiful and clean graphs and has many options as far as graphs go. In this application I utilized two bar graphs, a pie graph, and a bubble graph.
#### Bar Graphs
For the bar graph, it takes a function that passes the response from the API call. The response then gets destructured and looped over. For every index in the response, push the name to the dataLabel array and push the price to the dataPrice array.
```javascript
  const data = res.Markets;
  let dataLabels = [];
  let dataPrice = [];
  for (let i = 0; i < data.length; i++) {
    dataLabels.push(data[i].Name);
    dataPrice.push(data[i].Price);
  }
```
With the data stored in a proper array, you can now continue to build the graph. The graphs are an object with many key/value pairs. Begin with the type (bar, bubble, pie, radar, ect.), labels and the value will be the dataLabels array, datasets which is the graphable data and in this case will be the dataPrice array. From there you can set the backgroundColor, borderColor, borderWidth, fontSizes, and scale the yAxis with the proper increments.
#### Bubble Graph
The bubble graph takes in the same data from the previous API call. Take the response, destructure, loop over the data and push each index of volume and price into the dataBubbles array.
```javascript
  const data = res.Markets;
  let dataBubbles = [];
  for (let i = 0; i < data.length; i++) {
    dataBubbles.push({ x: data[i].Volume_24h, y: data[i].Price, r: 7 });
  }
  ```
The volume is the amount of exchanges in a 24-hour period and this data is displayed on the x axis. The price for each currency is displayed on the y axis. The graph takes a third key "r" which is the radius of the bubble in pixels. 
#### Pie Graph
The Pie graph is visually pleasing and easy to understand for the user. This graph displays the top currencies with the highest 24-hour volume. The pie graph is like the other graphs and uses a similar API call, but renders only the currencies with a 24-hour volume greater than 1 million. There currencies are looped over, and the Volume is stored in a dataVolume array which is rendered on the graph. 
### Query Module
Not finding the data you need? This API spits back 2,400 cryptocurrencies, so to make it manageable I filtered the results to the top 20 currencies. The currency names are in a dropdown menu the user can select. Hit the "GO!" button next to the dropdown menu and the data for that currency will be appended to the bottom of the table. This is obtainable by using the filter() method.
```javascript
 const filterResponse = res.Markets;
 const fiveThousandths = filterResponse.filter(res => res.Price_btc >= 0.005);
```
After studying the other bar graphs, I noticed that higher btc prices were generally greater than 0.005. Knowing this information, use the filter method to find all the matching currencies that are greater than 0.005. The response went from 2,400 to 24. From there, filter out the currencies that were already in the table. To make the query work remove the forward slash in the label and change it from upper case to lower case. The label is set as the value attribute and the name of the currency is the text the user can read.
```javascript
const dropdown = res => {
  for (let i = 0; i < res.length; i++) {
    let orginalLabel = res[i].Label;
    let regexLabel = orginalLabel.replace("/", "");
    let newLabel = regexLabel.toLowerCase();
    let option = $("<option>");
    option.attr("value", newLabel);
    option.text(res[i].Name);
    $("#dropdown").append(option);
  }
};
```
When the user clicks "GO!" this triggers a listener click function that first validates the form. It checks to see if a currency was selected, if no currency was selected a modal will pop up informing the user to select a currency. After the form has been validated, create a variable newQuery and grab the value from the selected currency and run it through the ajax call. With the response from the ajax call, have a function that passes the response and that function calls the createRow function and passes the response. 
```javascript
  if (validate()) {
    let newQuery = $(".form-control")
      .find(":selected")
      .val();
    let queryURL =
      "https://www.worldcoinindex.com/apiservice/ticker?key=" +
      key +
      "&label=" +
      newQuery +
      "&fiat=btc";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(res) {
      createRow(res);
    });
  } else {
    $("#validation-modal").modal("toggle");
  }
```
#### Sorting
The user can also choose to filter the data table by sorting the Price from high to low. This works by recursive strategy. Create a function sortPrice() and establish the initial variables table, dataRows, switching, i, x, y, shouldSwitch. The table will be equal to the id of the table and set switching to true. 
```javascript
function sortPrice() {
  let table, dataRows, switching, i, x, y, shouldSwitch;
  table = $("#table-data")[0];
  switching = true;
```
Create a recursive loop that passes switching. In the loop, set switching to false and set the dataRows equal to table.rows. Rows is a HTML Table Element property that returns a collection of all the rows in the table. Create a for loop that loops through the dataRows. Inside the for loop, set shouldSwitch to false, set x to the first index of the table data your analizing and y to the second data your analizing. Create an if statement that checks if x is less than y and IF true, set shouldSwitch to true and break the loop.
```javascript
  while (switching) {
    switching = false;
    dataRows = table.rows;
    for (i = 1; i < (dataRows.length - 1); i++) {
      shouldSwitch = false;
      x = dataRows[i].getElementsByTagName("td")[2];
      y = dataRows[i + 1].getElementsByTagName("td")[2];
      if (x.innerHTML < y.innerHTML) {
        shouldSwitch = true;
        break;
      }
    }
```
Now a value needs to be switch on the table. Create an if statement passing shouldSwitch and when shouldSwitch is true get the parentNode of the index of the dataRow and insert it before the other index, then set switching to true.
```javascript
    if (shouldSwitch) {
      dataRows[i].parentNode.insertBefore(dataRows[i + 1], dataRows[i]);
      switching = true;
    }
```
With switching set to true, the recursive loop will run again until all the data is sorted. 
#### Typewriter?
Just some fun JavaScript, I added a typewritter simulator. In the jumbotron it simulates typing out currencies and phrases, then after a few seconds it erases them. I wont go over all the code in detail, but go app.js and about line 220, you can check out the function. Its pretty cool. 
### Future Development
A good feature for this application would be to add the plugin DataTable, which supports pagination, sorting, and searching within the data table. 
## Tech Stack
- JavaScript
- jQuery
- Bootstrap
- CSS
- AJAX
- Chart.js
- Moment.js
- Express
- Node
## Link
https://cryptocurrency-capital.herokuapp.com
