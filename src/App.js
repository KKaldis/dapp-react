import logo from "./logo.svg";
import Web3 from "web3";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import ModalContent from "./Components/ModalContent";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [account, setAccount] = useState("no wallet connected");

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
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
    };

    const loadAccount = async () => {
      const web3 = new Web3(App.web3Provider);
      const account = await web3.eth.getAccounts();
      setAccount(account);
    };

    connectWallet();
    loadAccount();
  }, []);

  window.ethereum.on("accountsChanged", (account) => {
    setAccount(account);
  });

  window.ethereum.removeListener("accountsChanged", (account) => {
    setAccount(account);
  });

  window.ethereum.on("chainChanged", (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={setModalIsOpenToTrue}>Click to Open Modal</button>

        <p>
          Wallet address: <code>{account}</code>
        </p>
        <a
          className="App-link"
          href={"https://bscscan.com/address/" + account}
          target="_blank"
          rel="noopener noreferrer"
        >
          BSC Wallet Explorer
        </a>
        <a
          className="App-link"
          href={"https://etherscan.io/address/" + account}
          target="_blank"
          rel="noopener noreferrer"
        >
          ETH Wallet Explorer
        </a>
      </header>

      <Modal isOpen={modalIsOpen}>
        <button onClick={setModalIsOpenToFalse}>x</button>
        <ModalContent />
      </Modal>
    </div>
  );
}

export default App;
