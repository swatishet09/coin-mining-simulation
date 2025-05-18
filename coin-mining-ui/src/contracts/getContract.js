import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 

const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "blockNumber", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "miner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }
    ],
    "name": "BlockMined",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getMinedBlocks",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "blockNumber", "type": "uint256" },
          { "internalType": "address", "name": "miner", "type": "address" },
          { "internalType": "uint256", "name": "reward", "type": "uint256" }
        ],
        "internalType": "struct MiningSimulation.BlockData[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "nonce", "type": "uint256" },
      { "internalType": "bytes32", "name": "hash", "type": "bytes32" }
    ],
    "name": "mineBlock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not detected");

  // Only connect if not already connected
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  if (accounts.length === 0) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  return { contract, signer };
};