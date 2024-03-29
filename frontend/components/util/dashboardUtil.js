export const constructPortfolioGraph = (
  portfolioHistory,
  portfolios,
  stocks
) => {
  const combinedStats = {};
  let portfolioValue = 0;

  Object.values(portfolioHistory).forEach((historyItem, idx) => {
    if (idx == 0) {
      combinedStats["chart"] = _.cloneDeep(stocks[historyItem.symbol].chart);
      combinedStats["chart"].forEach(
        (item, csIdx) => (combinedStats.chart[csIdx].vw = 0)
      );
    }
    combinedStats["chart"].forEach((dataPoint, idx) => {
      if (new Date(historyItem.created_at) <= new Date(dataPoint.t)) {
        combinedStats.chart[idx].vw +=
          stocks[historyItem.symbol].chart[idx].vw * historyItem.num_shares;
      }
    });

    portfolioValue +=
      historyItem.num_shares *
      stocks[historyItem.symbol].chart[
        stocks[historyItem.symbol].chart.length - 1
      ].vw;

    let combinedChart = combinedStats["chart"];
    let last = combinedChart[combinedChart.length - 1];
    let first = combinedChart[0];
    combinedStats["percentageChange"] =
      last.vw / first.vw === 0
        ? 0.0
        : ((last.vw / first.vw - 1) * 100).toFixed(2);
    combinedStats["dollarChange"] = (last.vw - first.vw).toFixed(2);
  });
  combinedStats["price"] = portfolios.portfolioValue;
  combinedStats["chart"][combinedStats["chart"].length - 1].vw =
    portfolios.portfolioValue;

  return combinedStats;
};

export const enterSearchList = (e) => {
  e.preventDefault();

  if (!e.currentTarget.value) return null;

  switch (e.keyCode) {
    case 40:
      if (!$("#stock-list .selected").length) {
        $("#stock-list ul li:visible a")[0].classList.add("selected");
      } else {
        // move to next sibling
        $(e.currentTarget)
          .next()
          .find(".selected")
          .parent()
          .nextAll("li:visible")
          .first()
          .find("a")
          .addClass("selected");
        // remove selected from current item
        e.currentTarget.nextSibling
          .querySelectorAll(".selected")[0]
          .classList.remove("selected");
      }
      break;
    case 38:
      // only use up arrow if a list item is selected
      if (
        $("#stock-list .selected").length &&
        $("#stock-list li:visible").length > 1
      ) {
        // move to next sibling
        $(e.currentTarget)
          .next()
          .find(".selected")
          .parent()
          .prevAll("li:visible")
          .first()
          .find("a")
          .addClass("selected");
        // remove selected from current item
        $(e.currentTarget)
          .next()
          .find(".selected")
          .last()
          .removeClass("selected");
      }

      break;
    case 13:
      // // press enter to visit link

      // only use enter if a stock is selected
      if ($("#stock-list .selected").length) {
        $("#stock-list .selected")[0].click();
        // remove focus from search bar when user presses enter
        document.activeElement.blur();
        $("#stock-list .selected")[0].classList.remove("selected");
        $("#stock-list li").hide();
      }
      break;
    default:
      // hide any selected list items
      $("#stock-list ul li a.selected").removeClass("selected");
      break;
  }
};

export const filterResults = (e) => {
  e.preventDefault();

  $(".category").show();
  document.querySelectorAll(".stock-list ul li").forEach((item, idx) => {
    if (item.textContent === "No results match.") {
      item.parentNode.removeChild(item);
    }
  });

  setSearchValue(e.currentTarget.value);

  let stockList = document.getElementById("stock-list");

  if (!e.currentTarget.value) {
    stockList.firstChild.style.display = "none";
  } else {
    stockList.firstChild.style.display = "block";
  }

  let currentValue = e.currentTarget.value;

  let li = stockList.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];
    // make sure a has a value to avoid console errors

    if (a) {
      const info = a.getElementsByTagName("span");
      const symbol = info[0].textContent;
      const company = info[1].textContent;
      if (
        symbol.includes(currentValue.toUpperCase()) ||
        company.includes(currentValue[0].toUpperCase() + currentValue.slice(1))
      ) {
        li[i].style.display = "block";
        // change has this ternary for when it's on the stock show page, or dashboard page. for the search results
        const change = match.params.symbol
          ? stocks[match.params.symbol.toUpperCase()].dollarChange
          : "";
        const color = change <= 0 ? "negative-change" : "";

        li[i]
          .getElementsByTagName("a")[0]
          .getElementsByTagName("span")[0].innerHTML = symbol.replace(
          new RegExp(currentValue.toUpperCase(), "gi"),
          (match) => `<strong class="highlight ${color}">${match}</strong>`
        );
        li[i]
          .getElementsByTagName("a")[0]
          .getElementsByTagName("span")[1].innerHTML = company.replace(
          new RegExp(
            currentValue[0].toUpperCase() + currentValue.slice(1),
            "gi"
          ),
          (match) => `<strong class="highlight ${color}">${match}</strong>`
        );
      } else {
        li[i].style.display = "none";
      }
    }
  }

  if (!$("#stock-list ul li:visible a").length) {
    $(".category").hide();
    $(".stock-list ul").append('<li class="no-results">No results match.</li>');
  }
};
