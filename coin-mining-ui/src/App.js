
import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import MinedBlocks from "./components/MinedBlocks";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);

  const handleSetAccount = (acc) => setAccount(acc);

  return (
    <div>
      <WalletConnect account={account} setAccount={handleSetAccount} />
      <h1>⛓️ Blockchain Mining Simulation</h1>
      <MinedBlocks account={account} />
    </div>
  );
}

export default App;

