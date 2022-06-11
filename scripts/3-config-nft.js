import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xAa36d5292faF0DC1AFD69d199a97d21ea4CF8E72");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Minion Meme",
        description: "This NFT will give you access to MemeDAO!",
        image: readFileSync("scripts/assets/minion.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();