import Web3 from "web3";
import { useState } from "react";
import Connected from "./Components/Connected";
import NotConnected from "./Components/NotConnected";

import ModalContent from "./Components/ModalContent";
import Modal from "react-modal";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [account, setAccount] = useState("no wallet connected");

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
    setAccount(account);
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

  // window.ethereum.on("chainChanged", (chainId) => {
  //   // Handle the new chain.
  //   // Correctly handling chain changes can be complicated.
  //   // We recommend reloading the page unless you have good reason not to.
  //   window.location.reload();
  // });

  if (account > 0) {
    return <Connected account={account} />;
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <NotConnected /> */}
        <button onClick={connectWallet}>Connect Your Wallet</button>
      </header>
      <Modal isOpen={modalIsOpen}>
        <button onClick={setModalIsOpenToFalse}>x</button>
        <ModalContent />
      </Modal>
    </div>
  );
}

export default App;
