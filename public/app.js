const key = "e9PqycN4UPM5OgJpDVHwPKpmvVnx3v";

// bar graph

function renderChart(res) {
  let ctx = $("#myChart");
  const data = res.Markets;
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        data[0].Name,
        data[1].Name,
        data[2].Name,
        data[3].Name,
        data[4].Name,
        data[5].Name,
        data[6].Name,
        data[7].Name,
        data[8].Name,
        data[9].Name
      ],
      datasets: [
        {
          label: ["BTC Price"],
          data: [
            data[0].Price,
            data[1].Price,
            data[2].Price,
            data[3].Price,
            data[4].Price,
            data[5].Price,
            data[6].Price,
            data[7].Price,
            data[8].Price,
            data[9].Price
          ],
          backgroundColor: [
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(66, 134, 244, 0.2)",
            "rgba(66, 244, 89, 0.2)",
            "rgba(244, 66, 149, 0.2)",
            "rgba(229, 66, 244, 0.2)",
            "rgba(66, 244, 238, 0.2)",
            "rgba(244, 226, 66, 0.2)",
            "rgba(244, 66, 66, 0.2)",
            "rgba(244, 179, 66, 0.2)"
          ],
          borderColor: [
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(66, 134, 244, 1)",
            "rgba(66, 244, 89, 1)",
            "rgba(244, 66, 149, 1)",
            "rgba(229, 66, 244, 1)",
            "rgba(66, 244, 238, 1)",
            "rgba(244, 226, 66, 1)",
            "rgba(244, 66, 66, 1)",
            "rgba(244, 179, 66, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      legend: {
        labels: {
          fontSize: 24
        }
      },
      title: {
        display: true,
        text: "Price Bar Graph",
        fontSize: 32
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontSize: 20
            }
          }
        ]
      }
    }
  });
}

// Render second Graph

function renderGraph(data) {
  console.log(data);
  //const data = res
  let ctx = $("#mySecondChart");
  const mySecondChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["CNY", "EUR", "GBP", "USD"],
      datasets: [
        {
          label: "Price Per BTN",
          data: [
            data.Price_cny,
            data.Price_eur,
            data.Price_gbp,
            data.Price_usd
          ],
          backgroundColor: [
            "rgba(11, 117, 5, 0.2)",
            "rgba(11, 117, 5, 0.2)",
            "rgba(11, 117, 5, 0.2)",
            "rgba(11, 117, 5, 0.2)"
          ],
          borderColor: [
            "rgba(11, 117, 5, 1)",
            "rgba(11, 117, 5, 1)",
            "rgba(11, 117, 5, 1)",
            "rgba(11, 117, 5, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      legend: {
        labels: {
          fontSize: 24
        }
      },
      title: {
        display: true,
        text: "Bitcoin to Market Value",
        fontSize: 32
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontSize: 20
            }
          }
        ]
      }
    }
  });
}

// pie graph

function renderPie(res) {
  let ctx = $("#myThirdChart");
  const data = res.Markets;
  const myThirdChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        data[0].Name,
        data[1].Name,
        data[2].Name,
        data[3].Name,
        data[4].Name
      ],
      datasets: [
        {
          label: ["24h Volume"],
          data: [
            data[0].Volume_24h,
            data[1].Volume_24h,
            data[2].Volume_24h,
            data[3].Volume_24h,
            data[4].Volume_24h
          ],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(66, 134, 244, 0.2)",
            "rgba(66, 244, 89, 0.2)",
            "rgba(244, 66, 149, 0.2)",
            "rgba(255, 206, 86, 0.2)"
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(66, 134, 244, 1)",
            "rgba(66, 244, 89, 1)",
            "rgba(244, 66, 149, 1)",
            "rgba(255, 206, 86, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      legend: {
        labels: {
          fontSize: 24
        }
      },
      title: {
        display: true,
        text: "Top 5 BTN 24h",
        fontSize: 32
      }
    }
  });
}

function renderRandom(res) {
  let ctx = $("#myFourthChart");
  const data = res.Markets;
  const myFourthChart = new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [
        {
          label: ["BTN"],
          data: [
            {
              x: data[0].Volume_24h,
              y: data[0].Price,
              r: 10
            },
            {
              x: data[1].Volume_24h,
              y: data[1].Price,
              r: 10
            },
            {
              x: data[2].Volume_24h,
              y: data[2].Price,
              r: 10
            },
            {
              x: data[3].Volume_24h,
              y: data[3].Price,
              r: 10
            },
            {
              x: data[4].Volume_24h,
              y: data[4].Price,
              r: 10
            },
            {
              x: data[5].Volume_24h,
              y: data[5].Price,
              r: 10
            },
            {
              x: data[6].Volume_24h,
              y: data[6].Price,
              r: 10
            },
            {
              x: data[7].Volume_24h,
              y: data[7].Price,
              r: 10
            },
            {
              x: data[8].Volume_24h,
              y: data[8].Price,
              r: 10
            },
            {
              x: data[9].Volume_24h,
              y: data[9].Price,
              r: 10
            }
          ],
          backgroundColor: "rgb(255, 0, 0)"
        }
      ]
    },
    options: {
      legend: {
        labels: {
          fontSize: 24
        }
      },
      title: {
        display: true,
        text: "Price/Volume",
        fontSize: 32
      }
    }
  });
}

// typewriter constructor

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};

// create dynamic table with api data

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

// Load data from API

let queryURL =
  "https://www.worldcoinindex.com/apiservice/ticker?key=" +
  key +
  "&label=ethbtc-ltcbtc-omnibtc-cajbtc-xmrbtc-dashbtc-ppcbtc-bnbbtc-metbtc-eosbtc&fiat=btc";
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(res) {
  createRow(res);
  renderChart(res);
  renderRandom(res);
});

let secondQueryUrl =
  "https://www.worldcoinindex.com/apiservice/json?key=" + key;
$.ajax({
  url: secondQueryUrl,
  method: "GET"
}).then(function(res) {
  const data = res.Markets[290];
  console.log(data);
  renderGraph(data);
});

let thirdQueryUrl =
  "https://www.worldcoinindex.com/apiservice/ticker?key=" +
  key +
  "&label=ethbtc-ltcbtc-btcbtc-eosbtc-bchbtc&fiat=btc";
$.ajax({
  url: thirdQueryUrl,
  method: "GET"
}).then(function(res) {
  renderPie(res);
});
