import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
const App = () => {
  // use the hooks from thirdweb. 
  const address = useAddress(); 
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  const editionDrop = useEditionDrop("0xAa36d5292faF0DC1AFD69d199a97d21ea4CF8E72");
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    //if they don't have a connected wallet, exit
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address,0);
        if(balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (err) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", err);
      }
    };
    checkBalance();
    
  }, [address, editionDrop]);

  const mintNFT = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0",1);
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      setHasClaimedNFT(true);
    } catch (err) {
      setHasClaimedNFT(false);
      console.log("Failed to mint NFT", err);
    } finally {
      setIsClaiming(false);
    }
  }
  


  // This is the case where the user hasn't connected their wallet to web app. let em connectWallet.
  if(!address) {
    return (
      <div className="landing">
        <h1>Welcome to MemeDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    )
  }


  // Add this little piece!
if (hasClaimedNFT) {
  return (
    <div className="member-page">
      <h1>🍪DAO Member Page</h1>
      <p>Congratulations on being a member</p>
    </div>
  );
};


  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  // Render mint nft screen.
  return (
    <div className="mint-nft">
      <h1>Mint your free 🍪DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={mintNFT}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
