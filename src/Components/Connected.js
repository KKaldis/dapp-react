import React from "react";
// import logo from "../logo.svg";
import logo from "../unnamed.jpg";
import chains from "../data/chainsInfo.json";

const Connected = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo m-5" alt="logo" />

        <p>
          Wallet address: <code>{props.account}</code>
        </p>
        <h2>
          Netowk ID: <code>{props.networkID}</code>
        </h2>
        <h2>
          Chain ID: <code>{props.chainID}</code>
        </h2>
        {/* <h1>
          Chain Symbol: <code>{chains[props.networkID]["chainSymbol"]}</code>
        </h1>
        <h1>
          Chain Name: <code>{chains[props.networkID]["chainName"]}</code>
        </h1> */}

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
