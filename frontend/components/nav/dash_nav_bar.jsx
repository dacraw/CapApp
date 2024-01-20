import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/session_actions.js";
import { Link, useLocation, useMatch, useParams } from "react-router-dom";
import { fetchPortfolios } from "../../actions/portfolio_actions";
import { fetchStocks } from "../../actions/stock_actions.js";

const enterSearchList = (e) => {
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

const DashNavBar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const userLogout = () => dispatch(logout());

  const currentUser = useSelector((state) => state.session.id);
  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchPortfolios(currentUser));
  }, [dispatch]);

  const cashAvailable = useSelector(
    (state) => state.entities.portfolios.cashAvailable
  );
  const stocks = useSelector((state) => state.entities.stocks);
  const portfolios = useSelector((state) => state.entities.portfolios);

  useEffect(() => {
    setSearchValue("");
    $("#stock-list ul:first-child").fadeOut(100);
  }, [location.pathname]);

  const filterResults = (e) => {
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
          company.includes(
            currentValue[0].toUpperCase() + currentValue.slice(1)
          )
        ) {
          li[i].style.display = "block";
          // change has this ternary for when it's on the stock show page, or dashboard page. for the search results
          const change = params.symbol
            ? stocks[params.symbol.toUpperCase()].dollarChange
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
      $(".stock-list ul").append(
        '<li class="no-results">No results match.</li>'
      );
    }
  };

  const formatMoney = (number, decPlaces, decSep, thouSep) => {
    (decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces),
      (decSep = typeof decSep === "undefined" ? "." : decSep);
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(
      parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces)))
    );
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      sign +
      (j ? i.substr(0, j) + thouSep : "") +
      i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
      (decPlaces
        ? decSep +
          Math.abs(number - i)
            .toFixed(decPlaces)
            .slice(2)
        : "")
    );
  };

  if (!currentUser || !stocks) return null;
  if (!cashAvailable) return null;

  return (
    <div className="dashboard-nav-container">
      <section className="content">
        <Link to="/">
          <div className="logo-notext"></div>
        </Link>
        <div className="search-wrapper">
          <input
            id="stock-search"
            onChange={(e) => {
              // setSearchValue(e.currentTarget.value);
              filterResults(e);
            }}
            onKeyUp={enterSearchList}
            value={searchValue}
            className="search"
            placeholder="Enter stock symbol"
            type="text"
            autoComplete="off"
            name="stock-search"
          />

          <section className="stock-list" id="stock-list">
            <ul>
              {/* <ul onKeyDown={this.navigateResults}> */}
              <li className="category">Stocks</li>
              {Object.values(stocks).map((stock, idx) => (
                <li key={idx}>
                  <Link
                    to={`/stocks/${
                      stock.symbol ? stock.symbol.toLowerCase() : ""
                    }`}
                  >
                    <span className="symbol">{stock.symbol}</span>
                    <span className="company">{stock.company}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <i className="fas fa-search"></i>
        </div>
        <ul className="links">
          <li>
            <a href="https://dacraw.github.io/" target="_blank">
              Personal Site
            </a>
          </li>
          <li>
            <a href="https://github.com/dacraw" target="_blank">
              Github
            </a>
          </li>
          <li>
            <a
              href="http://www.linkedin.com/in/doug-a-crawford"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <Link to="/dashboard">Portfolio</Link>
          </li>
          <li className="account-dropdown">
            <a
              onClick={(e) => {
                e.stopPropagation();
                $(e.currentTarget).next().fadeToggle(200);
              }}
            >
              Account
            </a>
            <ul className="account-options" id="dash-nav-account-options">
              <li>
                <div className="summary">
                  {" "}
                  <h3>{currentUser.username}</h3>
                  <div className="double-col">
                    <div>
                      <h4 id="dashboard-nav-pv">
                        ${formatMoney(portfolios.portfolioValue, 2, ".", ",")}
                      </h4>
                      <h5>Portfolio Value</h5>
                    </div>
                    <div>
                      <h4>{cashAvailable}</h4>
                      <h5>Cash Available</h5>
                    </div>
                  </div>
                </div>
              </li>
              <hr />
              <li>
                <a onClick={userLogout}>
                  <i className="fas fa-sign-out-alt"></i>Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};
// class DashNavBar extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             searchValue: "",
//         }
//         this.filterResults = this.filterResults.bind(this);
//         this.enterSearchList = this.enterSearchList.bind(this);
//     }

//     toggleAccountDropdown(e){
//         e.stopPropagation();
//         $(e.currentTarget).next().fadeToggle(200);
//     }

//     componentDidUpdate(prevProps){

//         if (this.props.location.pathname !== prevProps.location.pathname){
//             this.setState({searchValue: ""})
//             $('#stock-list ul:first-child').fadeOut(100);
//         }
//     }

//     enterSearchList(e){

//         e.preventDefault();

//         if (!e.currentTarget.value) return null;

//         switch (e.keyCode) {
//             case 40:
//                 if (!$('#stock-list .selected').length) {
//                     $('#stock-list ul li:visible a')[0].classList.add('selected')
//                 } else {
//                     // move to next sibling
//                     $(e.currentTarget).next().find('.selected').parent().nextAll('li:visible').first().find('a').addClass('selected')
//                     // remove selected from current item
//                     e.currentTarget.nextSibling.querySelectorAll('.selected')[0].classList.remove('selected');
//                 }
//                 break;
//             case 38:
//                 // only use up arrow if a list item is selected
//                 if ($('#stock-list .selected').length && $('#stock-list li:visible').length > 1){
//                     // move to next sibling
//                     $(e.currentTarget).next().find('.selected').parent().prevAll('li:visible').first().find('a').addClass('selected')
//                     // remove selected from current item
//                     $(e.currentTarget).next().find('.selected').last().removeClass('selected');
//                 }

//                 break;
//             case 13:
//                 // // press enter to visit link

//                 // only use enter if a stock is selected
//                 if ($('#stock-list .selected').length){
//                     $('#stock-list .selected')[0].click();
//                     // remove focus from search bar when user presses enter
//                     document.activeElement.blur();
//                     $('#stock-list .selected')[0].classList.remove('selected');
//                     $('#stock-list li').hide();
//                 }
//                 break;
//             default:
//                 // hide any selected list items
//                 $('#stock-list ul li a.selected').removeClass('selected');
//                 break;
//         }
//     }

//     filterResults(e){
//         e.preventDefault();
//         const props = this.props;

//         $('.category').show();
//         document.querySelectorAll('.stock-list ul li').forEach ( (item, idx) => {
//             if (item.textContent === 'No results match.'){
//                       item.parentNode.removeChild(item)
//             }
//         })

//         this.setState({ searchValue: e.currentTarget.value});

//         let stockList = document.getElementById('stock-list');

//         if (!e.currentTarget.value){
//             stockList.firstChild.style.display = "none"
//         } else {
//             stockList.firstChild.style.display = "block"
//         }

//         let currentValue = e.currentTarget.value;

//         let li = stockList.getElementsByTagName('li');

//         for (let i = 0; i < li.length; i++){
//             let a = li[i].getElementsByTagName('a')[0];
//             // make sure a has a value to avoid console errors

//             if (a){
//                 const info = a.getElementsByTagName('span');
//                 const symbol = info[0].textContent;
//                 const company = info[1].textContent;
//                 if (symbol.includes(currentValue.toUpperCase()) || company.includes(currentValue[0].toUpperCase() + currentValue.slice(1))){
//                     li[i].style.display = "block";
//                     // change has this ternary for when it's on the stock show page, or dashboard page. for the search results
//                     const change = (props.match.params.symbol) ? (props.stocks[props.match.params.symbol.toUpperCase()]).dollarChange : "";
//                     const color = (change <= 0) ? "negative-change" : "";

//                     li[i].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerHTML = symbol.replace(new RegExp(currentValue.toUpperCase(), "gi"), (match) => `<strong class="highlight ${color}">${match}</strong>`);
//                     li[i].getElementsByTagName('a')[0].getElementsByTagName('span')[1].innerHTML = company.replace(new RegExp(currentValue[0].toUpperCase() + currentValue.slice(1), "gi"), (match) => `<strong class="highlight ${color}">${match}</strong>`);

//                 } else {
//                     li[i].style.display = "none";
//                 }
//             }
//         }

//         if (!$('#stock-list ul li:visible a').length){
//             $('.category').hide();
//             $('.stock-list ul').append('<li class="no-results">No results match.</li>')
//         }
//     }
//     formatMoney(number, decPlaces, decSep, thouSep) {
//         decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
//         decSep = typeof decSep === "undefined" ? "." : decSep;
//         thouSep = typeof thouSep === "undefined" ? "," : thouSep;
//         var sign = number < 0 ? "-" : "";
//         var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
//         var j = (j = i.length) > 3 ? j % 3 : 0;

//         return sign +
//             (j ? i.substr(0, j) + thouSep : "") +
//             i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
//             (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
//     }

//     render(){

//         const { currentUser, logout, cashAvailable, stocks, portfolios } = this.props;
//         if (!currentUser || !stocks) return null
//         if (!cashAvailable) return null

//         return (
//             <div className="dashboard-nav-container">
//                 <section className="content">
//                     <Link to="/"><div className="logo-notext"></div></Link>
//                     <div className="search-wrapper"  >
//                         <input id="stock-search" onChange={this.filterResults} onKeyUp={this.enterSearchList} value={this.state.searchValue} className="search" placeholder="Enter stock symbol" type="text" autoComplete="off" name="stock-search" id=""/>

//                         <section className="stock-list" id="stock-list">
//                             <ul onKeyDown={this.navigateResults}>
//                                 <li className="category">Stocks</li>
//                                 {Object.values(stocks).map( (stock, idx) => <li key={idx}><Link to={`/stocks/${(stock.symbol) ? stock.symbol.toLowerCase() : ""}`}><span className="symbol">{stock.symbol}</span><span className="company">{stock.company}</span></Link></li>)}
//                             </ul>
//                         </section>

//                         <i className="fas fa-search"></i>
//                     </div>
//                     <ul className="links">
//                         <li><a href='https://dacraw.github.io/' target="_blank">Personal Site</a></li>
//                         <li><a href='https://github.com/dacraw' target="_blank">Github</a></li>
//                         <li><a href='http://www.linkedin.com/in/doug-a-crawford' target="_blank">LinkedIn</a></li>
//                         <li><Link to="/dashboard">Portfolio</Link></li>
//                         <li className="account-dropdown"><a onClick={this.toggleAccountDropdown}>Account</a>
//                             <ul className="account-options" id="dash-nav-account-options">
//                                 <li>
//                                     <div className="summary"> {/* TOP PART OF ACCOUNT DROPDOWN */}
//                                         <h3>{currentUser.username}</h3>
//                                         <div className="double-col">
//                                             <div>
//                                                 <h4 id="dashboard-nav-pv">${this.formatMoney(portfolios.portfolioValue,2,".",",")}</h4>
//                                                 <h5>Portfolio Value</h5>
//                                             </div>
//                                             <div>
//                                                 <h4>{cashAvailable}</h4>
//                                                 <h5>Cash Available</h5>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </li>
//                                 <hr />
//                                 <li><a onClick={logout}><i className="fas fa-sign-out-alt"></i>Logout</a></li>
//                             </ul>
//                         </li>
//                     </ul>
//                 </section>
//             </div>
//         )
//     }
// }

export default DashNavBar;
