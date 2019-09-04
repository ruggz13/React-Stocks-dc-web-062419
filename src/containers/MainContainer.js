import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      filterTerm: "",
      selectedOption: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(res => res.json())
      .then(stocks => {
        let stocksArray = stocks.map(stock => {
          return { ...stock, myStock: false };
        });
        this.setState({ stocks: stocksArray });
      });
  }

  sortStocksAlpha = () => {
    let sort = this.state.stocks.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
    this.setState({ stocks: sort, selectedOption: "Alphabetically" });
  };

  sortStocksNum = () => {
    let sort = this.state.stocks.sort((a, b) => {
      return a.price > b.price ? 1 : -1;
    });
    this.setState({ stocks: sort, selectedOption: "Price" });
  };

  onChangeFilter = event => {
    this.setState({ filterTerm: event.target.value });
  };

  renderStocks = () => {
    let filteredStocksArray = this.state.stocks.filter(stock => {
      return stock.type === this.state.filterTerm;
    });

    if (filteredStocksArray.length === 0) {
      return this.state.stocks;
    } else {
      return filteredStocksArray;
    }
  };

  buyMyStock = stockObj => {
    let stockArray = this.state.stocks.map(stock => {
      if (stockObj.id === stock.id) {
        if (stock.myStock === false) {
          let myNewStock = { ...stock };
          myNewStock.myStock = true;
          return myNewStock;
        }
      }
      return stock;
    });
    this.setState({ stocks: stockArray });
  };

  sellMyStock = stockObj => {
    let stockArray = this.state.stocks.map(stock => {
      if (stockObj.id === stock.id) {
        if (stock.myStock === true) {
          let myNewStock = { ...stock };
          myNewStock.myStock = false;
          return myNewStock;
        }
      }
      return stock;
    });
    this.setState({ stocks: stockArray });
  };

  getMyStocks() {
    return this.state.stocks.filter(stock => stock.myStock);
  }

  render() {
    return (
      <div>
        <SearchBar
          onChangeFilter={this.onChangeFilter}
          sortStocksAlpha={this.sortStocksAlpha}
          sortStocksNum={this.sortStocksNum}
          selectedOption={this.state.selectedOption}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.renderStocks()}
              handleMyStock={this.buyMyStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              myStocksArray={this.getMyStocks()}
              handleMyStock={this.sellMyStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
