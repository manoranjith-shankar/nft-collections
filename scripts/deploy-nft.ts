const hre = require("hardhat");

const contractAddress = "0xB059d9EDd4255aa20372471ce7F3ECf5376dF444";
const ownerAddress = "0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb"

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the Crypto0x Contract
  const nftContract = await hre.ethers.deployContract("Crypto0x", [contractAddress], { from: ownerAddress});

  // wait for the contract to deploy
  await nftContract.waitForDeployment();

  // print the address of the deployed contract
  console.log("NFT Contract Address:", nftContract.target);

  // Sleep for 30 seconds while Etherscan indexes the new contract deployment
  await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

  // Verify the contract on etherscan
  await hre.run("verify:verify", {
    address: nftContract.target,
    constructorArguments: [contractAddress],
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });