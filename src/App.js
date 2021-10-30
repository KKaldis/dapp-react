import Web3 from "web3";
import { useState } from "react";
import Connected from "./components/Connected";
import NotConnected from "./components/NotConnected";
import ModalContent from "./components/ModalContent";
import Modal from "react-modal";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [account, setAccount] = useState("no wallet connected");
  const [chainID, setChainID] = useState();
  const [networkID, setNetworkID] = useState();

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

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
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      //Look for GANACHE address
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      setModalIsOpenToTrue();
    }

    loadAccount();
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

  // useEffect(() => {
  //   connectWallet();
  //   loadAccount();
  // }, [account]);

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

  if (account > 0) {
    return (
      <Connected account={account} chainID={chainID} networkID={networkID} />
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <NotConnected /> */}
        <button onClick={connectWallet}>Connect Your Wallet</button>
      </header>
      <Modal isOpen={modalIsOpen}>
        <button class="btn btn-outline-dark" onClick={setModalIsOpenToFalse}>
          x
        </button>
        <ModalContent />
      </Modal>
    </div>
  );
}

export default App;
