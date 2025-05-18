
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

// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import "./App.css";

// import MiningSimulation from "./artifacts/contracts/MiningSimulation.sol/MiningSimulation.json"; // Adjust path if needed

// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed address

// function App() {
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [minedBlocks, setMinedBlocks] = useState([]);

//   // Connect wallet and set provider/signer/contract
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
//         await tempProvider.send("eth_requestAccounts", []);
//         const tempSigner = tempProvider.getSigner();
//         const tempAccount = await tempSigner.getAddress();

//         const tempContract = new ethers.Contract(
//           contractAddress,
//           MiningSimulation.abi,
//           tempSigner
//         );

//         setProvider(tempProvider);
//         setSigner(tempSigner);
//         setAccount(tempAccount);
//         setContract(tempContract);

//         console.log("Wallet connected:", tempAccount);
//       } catch (err) {
//         console.error("Wallet connection failed:", err);
//       }
//     } else {
//       alert("MetaMask not detected");
//     }
//   };

//   // Mine block with frontend hashing logic
//  const mineBlock = async () => {
//   if (!signer || !contract || !account) {
//     alert("Wallet not connected or contract unavailable");
//     return;
//   }

//   let nonce = 0;
//   let hash;
//   const difficulty = ethers.BigNumber.from("0x1").shl(240); // 2^240

//   while (true) {
//     const blockHeader = `${Date.now()}-${account}-${nonce}`;
//     const hashed = ethers.utils.sha256(ethers.utils.toUtf8Bytes(blockHeader));
//     hash = hashed;

//     if (ethers.BigNumber.from(hash).lt(difficulty)) break;
//     nonce++;
//   }

//   console.log("Found valid nonce:", nonce);
//   console.log("Hash:", hash);

//   try {
//     const tx = await contract.mineBlock(nonce, hash);
//     await tx.wait();

//     alert("Block mined and submitted!");
//     loadMinedBlocks();
//   } catch (err) {
//     console.error("Mining failed:", err);
//     alert("Mining failed");
//   }
// };


//   // Load mined blocks from contract
//   const loadMinedBlocks = async () => {
//     if (contract) {
//       try {
//         const blocks = await contract.getMinedBlocks();
//         setMinedBlocks(blocks);
//       } catch (err) {
//         console.error("Failed to load blocks:", err);
//       }
//     }
//   };

//   // Auto-load blocks when contract is set
//   useEffect(() => {
//     if (contract) {
//       loadMinedBlocks();
//     }
//   }, [contract]);

//   return (
//     <div className="App">
//       <h1>⛓️ Blockchain Mining Simulation</h1>

//       <button onClick={connectWallet}>
//         {account ? `Connected: ${account}` : "Connect Wallet"}
//       </button>

//       <button onClick={mineBlock} disabled={!account}>
//         ⛏️ Start Mining
//       </button>

//       <h2>Mined Blocks</h2>
//       <ul>
//         {minedBlocks.map((block, idx) => (
//           <li key={idx}>
//             Block #{block[0].toString()} | Miner: {block[1]} | Reward:{" "}
//             {ethers.utils.formatEther(block[2])} ETH
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


