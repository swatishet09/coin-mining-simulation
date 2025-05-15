# Blockchain Mining Simulation ⛏️

A simple blockchain mining simulation using Solidity (Hardhat) and React with MetaMask integration.

## 📁 Project Structure
- `coin-mining-simulation/`: Smart contract and Hardhat backend
- `coin-mining-ui/`: React frontend with MetaMask mining button and mined block display

## 🚀 How to Run

### Backend

```bash
cd coin-mining-simulation
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
