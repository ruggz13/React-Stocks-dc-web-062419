import React from "react";
import Stock from "../components/Stock";

const StockContainer = props => {
  return (
    <div>
      <h2>Stocks</h2>
      {//render the list of stocks here
      props.stocks.map(stock => {
        return (
          <Stock
            stock={stock}
            key={stock.id}
            handleMyStock={props.handleMyStock}
          />
        );
      })}
    </div>
  );
};

export default StockContainer;
