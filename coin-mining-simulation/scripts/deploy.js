const hre = require("hardhat");


async function main() {
 const[deployer] = await hre.ethers.getSigners();

 console.log("Deployer from:", deployer.address);

 const MiningSimulation = await hre.ethers.getContractFactory("MiningSimulation");
 const contract = await MiningSimulation.deploy();

 await contract.waitForDeployment();

 const address = await contract.getAddress();
 console.log("MininigSimulation contract deployed to:", address);
    
}

main().catch((error)=>{
    console.error(error);
    process.exitCode=1;
});
