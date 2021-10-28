import React from "react";
import logo from "../logo.svg";

const Connected = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Wallet address: <code>{props.account}</code>
        </p>
        <a
          className="App-link"
          href={"https://bscscan.com/address/" + props.account}
          target="_blank"
          rel="noopener noreferrer"
        >
          BSC Wallet Explorer
        </a>
        <a
          className="App-link"
          href={"https://etherscan.io/address/" + props.account}
          target="_blank"
          rel="noopener noreferrer"
        >
          ETH Wallet Explorer
        </a>
      </header>
    </div>
  );
};

export default Connected;
