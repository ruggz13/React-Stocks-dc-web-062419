import React from "react";
import Stock from "../components/Stock";

const PortfolioContainer = props => {
  const renderMyStocks = array => {
    return array.map(stock => (
      <Stock stock={stock} key={stock.id} handleMyStock={props.handleMyStock} />
    ));
  };

  return (
    <div>
      <h2>My Portfolio</h2>
      {//render your portfolio stocks here
      renderMyStocks(props.myStocksArray)}
    </div>
  );
};

export default PortfolioContainer;
