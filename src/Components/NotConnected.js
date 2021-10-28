import React, {useState}from "react";
import ModalContent from "../Components/ModalContent";
import Modal from "react-modal";

import { connectWallet } from "../Scripts/web3Functions";

const NotConnected = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectWallet}>Connect Your Wallet</button>
      </header>
      <Modal isOpen={modalIsOpen}>
        <button onClick={setModalIsOpenToFalse}>x</button>
        <ModalContent />
      </Modal>
    </div>
  );
};

export default NotConnected;
