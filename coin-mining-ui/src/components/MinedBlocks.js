

/* eslint-disable no-undef */
import React, { useState, useEffect, useCallback } from "react";
import { getContract } from "../contracts/getContract";
import "../App.css";
import { keccak256 } from "ethers/crypto";
import { toUtf8Bytes } from "ethers/utils";
import { formatEther } from "ethers";

// import React, { useState, useEffect, useCallback } from "react";
// import { getContract } from "../contracts/getContract";
// // import { keccak256, toUtf8Bytes } from "ethers";
// import "../App.css";
// import { ethers } from "ethers";
// import { keccak256 } from "ethers/crypto";
// import { toUtf8Bytes } from "ethers/utils";


// const MinedBlocks = () => {
//   const [blocks, setBlocks] = useState([]);
//   const [mining, setMining] = useState(false);
//   const [error, setError] = useState("");
//   const [status, setStatus] = useState("");

//   const fetchBlocks = useCallback(async () => {
//     try {
//       const { contract } = await getContract();
//       const result = await contract.getMinedBlocks();
//       setBlocks(result);
//     } catch (err) {
//       console.error("Error fetching blocks:", err);
//       setError("Failed to load mined blocks.");
//     }
//   }, []);

//   const mineBlock = async () => {
//     setMining(true);
//     setError("");
//     setStatus("⛏️ Mining in progress...");

//     try {
//       const { contract, signer } = await getContract();
//       const address = await signer.getAddress();
//       const difficulty = BigInt("0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

//       let nonce = 0n;
//       let hash;

//       while (true) {
//         const input = toUtf8Bytes(`${address}-${nonce}`);
//         const hashed = keccak256(input);
//         hash = BigInt(hashed);

//         if (hash < difficulty) break;
//         nonce++;
//       }

//       const tx = await contract.mineBlock(nonce.toString(), keccak256(toUtf8Bytes(`${address}-${nonce}`)));
//       await tx.wait();

//       setStatus("Block mined and submitted!");
//       await fetchBlocks();
//     } catch (err) {
//       console.error(" Mining error:", err);
//       setError(err.message || "Unknown error");
//     }

//     setMining(false);
//   };

const MinedBlocks = ({ account }) => {
  const [blocks, setBlocks] = useState([]);
  const [mining, setMining] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const fetchBlocks = useCallback(async () => {
    try {
      const { contract } = await getContract();
      const result = await contract.getMinedBlocks();
      setBlocks(result);
    } catch (err) {
      console.error("Error fetching blocks:", err);
      setError("Failed to load mined blocks.");
    }
  }, []);

  const mineBlock = async () => {
    if (!account) {
      setError("Please connect MetaMask first.");
      return;
    }

    setMining(true);
    setError("");
    setStatus("⛏️ Mining in progress...");

    try {
      const { contract } = await getContract();
      const difficulty = BigInt("0x0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

      let nonce = 0n;
      let hash;

      while (true) {
        const input = toUtf8Bytes(`${account}-${nonce}`);
        const hashed = keccak256(input);
        hash = BigInt(hashed);

        if (hash < difficulty) break;
        nonce++;
      }

      const tx = await contract.mineBlock(nonce.toString(), keccak256(toUtf8Bytes(`${account}-${nonce}`)));
      await tx.wait();

      setStatus("✅ Block mined and submitted!");
      await fetchBlocks();
    } catch (err) {
      console.error(" Mining error:", err);
      setError(err.message || "Unknown error");
    }

    setMining(false);
  };


  useEffect(() => {
    fetchBlocks();
  }, [fetchBlocks]);

  return (
    <div className="container">
      <h2>🧱 <span style={{ color: "#3b82f6" }}>Mined Blocks</span></h2>
      <button onClick={mineBlock} disabled={mining}>
        {mining ? "Mining..." : "Start Mining"}
      </button>
      {status && <p className="status success">{status}</p>}
      {error && <p className="status error">{error}</p>}
      <ul className="block-list">
        {blocks.map((block, index) => (
          <li key={index}>
            <strong>Block #{block.blockNumber.toString()}</strong><br />
            Miner: {block.miner}<br />
            {/* Reward: {BigInt(block.reward).toString()} wei */}
            Reward: {formatEther(block.reward)} ETH

            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MinedBlocks;
