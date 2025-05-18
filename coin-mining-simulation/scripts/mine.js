// const hre = require("hardhat");
// const crypto = require("crypto");

// async function main() {
//     // Get deployer account
//     const [deployer] = await hre.ethers.getSigners();
//     console.log("Using deployer account:", deployer.address);

//     // Get contract
//     const MiningSimulation = await hre.ethers.getContractFactory("MiningSimulation");
//     const contract = await MiningSimulation.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

//     // Simulate mining with real hash
//     let nonce = 0;
//     let hash;

//     // Try finding a hash less than 2^240
//     while (true) {
//         const blockHeader = `${Date.now()}-${deployer.address}-${nonce}`;
//         const hashed = crypto.createHash("sha256").update(blockHeader).digest("hex");
//         hash = "0x" + hashed;

//         // Check difficulty (must start with enough zeros)
//         if (BigInt(hash) < (1n << 240n)) {
//             break;
//         }
//         nonce++;
//     }

//     console.log("Mining with nonce:", nonce);
//     console.log("Hash:", hash);

//     // Call the contract
//     const tx = await contract.connect(deployer).mineBlock(nonce, hash);
//     await tx.wait();

//     console.log("Block mined and submitted successfully!");

//     // Display mined blocks
//     const blocks = await contract.getMinedBlocks();
//     console.log(" Mined blocks:", blocks);
// }

// main().catch((error) => {
//     console.error("Error during mining:", error);
//     process.exit(1);
// });
