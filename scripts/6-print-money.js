import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
const token = sdk.getToken("0x41f6e7bD06b1e64aa088AACA39D6742C8D8Cd4A7");

(async () => {
  try {
    // What's the max supply you want to set? 1,000,000 is a nice number!
    const amount = 1_000_000;
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();

    // Print out how many of our token's are out there now!
    console.log("✅ There now is", totalSupply.displayValue, "$MEMION    in circulation");
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
