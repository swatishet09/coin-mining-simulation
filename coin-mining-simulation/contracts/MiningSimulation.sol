pragma solidity ^0.8.0;

contract MiningSimulation{
    struct BlockData{
        uint blockNumber;
        address miner;
        uint reward; 
    }

    BlockData[] public minedBlocks;
    uint public totalMined;
    uint public rewardPerBlock=1 ether;

    event BlockMined(uint blockNumber,address miner,uint reward);
    
    function mineBlock(uint nonce, bytes32 hash) public{
        require(uint256(hash) < 2**240, "Invalid hash: not enough difficulty");

        minedBlocks.push(BlockData(totalMined,msg.sender,rewardPerBlock));
        totalMined++;

        emit BlockMined(totalMined, msg.sender,rewardPerBlock);

    }

    function getMinedBlocks() public view returns (BlockData[] memory){
        return minedBlocks;
    }
}