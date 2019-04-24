const key = "e9PqycN4UPM5OgJpDVHwPKpmvVnx3v";

// bar graph

function renderChart(res) {
  let ctx = $("#myChart");
  const data = res.Markets;
  let dataLabels = [];
  let dataPrice = [];
  for (let i = 0; i < data.length; i++) {
    dataLabels.push(data[i].Name);
    dataPrice.push(data[i].Price);
  }
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dataLabels,
      datasets: [
        {
          label: ["BTC Price"],
          data: dataPrice,
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
          fontSize: 20
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
              fontSize: 16
            }
          }
        ]
      }
    }
  });
}

// second bar graph

function renderGraph(data) {
  let ctx = $("#mySecondChart");
  const mySecondChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["CNY", "EUR", "GBP", "USD"],
      datasets: [
        {
          label: "Price Per BTC",
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
          fontSize: 20
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
              fontSize: 16
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
  let dataLabels = [];
  let dataVolume = [];
  for (let i = 0; i < data.length; i++) {
    dataLabels.push(data[i].Name);
    dataVolume.push(data[i].Volume_24h);
  }
  const myThirdChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: dataLabels,
      datasets: [
        {
          label: ["24h Volume"],
          data: dataVolume,
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
        text: "Top 5 Currencies 24h",
        fontSize: 32
      }
    }
  });
}

// bubble graph

function renderRandom(res) {
  let ctx = $("#myFourthChart");
  const data = res.Markets;
  let dataBubbles = [];
  for (let i = 0; i < data.length; i++) {
    dataBubbles.push({ x: data[i].Volume_24h, y: data[i].Price, r: 7 });
  }
  const myFourthChart = new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [
        {
          label: ["Currency"],
          data: dataBubbles,
          backgroundColor: "rgb(255, 0, 0)"
        }
      ]
    },
    options: {
      legend: {
        labels: {
          fontSize: 20
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

// dynamic table with api data

const createRow = res => {
  const data = res.Markets;
  for (let i = 0; i < data.length; i++) {
    let newRow = $("<tr>").append(
      $("<td>").text(data[i].Label),
      $("<td>").text(data[i].Name),
      $("<td>").text(data[i].Price),
      $("<td>").text(data[i].Volume_24h),
      //$("<td>").text(moment.unix(data[i].Timestamp).format("lll"))
    );
    $("#table-data").append(newRow);
  }
};

// dopdown dynamic selection for currency

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
  renderGraph(data);
  const filterResponse = res.Markets;
  const fiveThousandths = filterResponse.filter(res => res.Price_btc >= 0.005);
  const removeDashBtc = fiveThousandths.filter(res => res.Name !== "Dash");
  const removeLitecoin = removeDashBtc.filter(res => res.Name !== "Litecoin");
  const removeEhereum = removeLitecoin.filter(res => res.Name !== "Ethereum");
  const removeExistingBtc = removeEhereum.filter(res => res.Name !== "Monero");
  dropdown(removeExistingBtc);
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

// onClick listener for dropdown, api call

$("#submit").on("click", function(e) {
  e.preventDefault();
  console.log("clicked");
  function validate() {
    let isValid = true;
    $(".form-control").each(function() {
      if ($(this).val() === "Select an Option") {
        isValid = false;
      }
    });
    return isValid;
  }
  if (validate()) {
    let newQuery = $(".form-control")
      .find(":selected")
      .val();
    console.log(newQuery);
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
      // renderChart(res);
      // renderRandom(res);
    });
  } else {
    $("#validation-modal").modal("toggle");
  }
});
