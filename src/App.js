import Web3 from "web3";
import { useState } from "react";
import Connected from "./components/Connected";
import NotConnected from "./components/NotConnected";
import ModalContent from "./components/ModalContent";
import Modal from "react-modal";
import styled, { ThemeProvider } from "styled-components";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [account, setAccount] = useState("no wallet connected");
  const [chainID, setChainID] = useState();
  const [networkID, setNetworkID] = useState();

  const connectWallet = async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
      loadAccount();
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
      loadAccount();
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      //Look for GANACHE address
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      setModalIsOpen(true);
    }
  };

  const loadAccount = async () => {
    const web3 = new Web3(App.web3Provider);
    const account = await web3.eth.getAccounts();
    const chainID = await web3.eth.getChainId();
    const networkID = await web3.eth.net.getId();
    setAccount(account);
    setChainID(chainID);
    setNetworkID(networkID);
    console.log("network ID: ", networkID);
    console.log("Chain ID: ", chainID);
  };

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (account) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      if (account > 0) {
        setAccount(account);
      } else {
        setAccount("no wallet connected");
      }
    });

    window.ethereum.removeListener("accountsChanged", () => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      setAccount("none");
    });

    window.ethereum.on("chainChanged", (chainId) => {
      loadAccount();
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      // window.location.reload();
    });
  }

  if (account > 0) {
    return (
      <Connected account={account} chainID={chainID} networkID={networkID} />
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <NotConnected /> */}
        <Button onClick={connectWallet}>Connect Your Wallet</Button>
      </header>
      <Modal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <ThemeProvider theme={theme}>
          {" "}
          <Button onClick={() => setModalIsOpen(false)}>X</Button>
        </ThemeProvider>
        <ModalContent />
      </Modal>
    </div>
  );
}

const Button = styled.button`
  font-size: 1em;
  padding: 0.5em 1em;
  border-radius: 3px;
  background-color: transparent;
  border-radius: 2em;

  /* Color the border and text with theme.main */
  color: ${({ theme }) => theme.main};
  border: 0.2rem solid ${(theme) => theme.main};
  background: ${({ theme }) => theme.second};
  min-height: 3em;
  min-width: 3em;
  transition: 0.5s;
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
  &:hover {
    box-shadow: 0.3em 0.3em 0em ${({ theme }) => theme.shadow};
  }
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button.defaultProps = {
  theme: {
    main: "var(--green-light)",
    second: "var(--pink-light)",
    shadow: "var(--green-dark)",
  },
};

// Define what props.theme will look like
const theme = {
  main: "var(--pink-light)",
  second: "var(--green-light)",
  shadow: "var(--pink-dark)",
};

export default App;
