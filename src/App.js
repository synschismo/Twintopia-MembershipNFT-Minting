import { useState } from "react";
import contractAbi from "./contracts/TwintopiaMembershipNFT.json"
import {ethers} from "ethers";
import Button from '@mui/material/Button';
import Video from './components/Video';
import Grid from '@mui/material/Grid';

//contract address
const contractAddress = "0x885D72aCc3dE7c44F655bDEE983FE54e4C2Bb529";
const abi = contractAbi.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const singer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, singer);

function App() {

  const [walletAddress, setWalletAddress] = useState("No Wallet Connection!");
  
  const [twtrId, setTwtrId] = useState("");
  const twtrIdChange = (e) => {
    setTwtrId(() => e.target.value);
  }

  const connectWalletHandler = async () => {
    if (!window.ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We are ready to go!");
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } catch(err) {
      console.log(err);
    }
  }

  const mintTWINMBRSHP = async () => {
    try {
      let _twtrId = twtrId;
      await contract.mintTWINMBRSHP(_twtrId);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div id="intro">
        <h1 id="twnText">Twintopia Membership NFT</h1>
        <h3 id="twnText">You Got a Invitation. Let's Mint your Membership and Join Discord.</h3>
        <a id="link-text" href="https://synschismo.com">Company Website</a>
        <br></br><br></br>
        <a id="link-text" href="https://t.co/4Qs5pWKol2">Discord</a>
      </div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        padding-top="0"
      >
        <Grid item xs={3}>
          <div id="inputBox">
            <h2>Mint Membership</h2>
            <br></br>
            <div id="contentbox">
              <p id="text-border">① Connect Your Wallet</p>
              <Button id="button" variant="contained" onClick={connectWalletHandler} style={{ color: "#ffffff", backgroundColor: "#444" }}>Connect Wallet</Button>
            </div>
            <div id="contentbox">
              <p id="text-border">② Enter Twitter ID</p>
              <input id="text-fill" value={twtrId} onChange={twtrIdChange} type="text" />
            </div>
            <div id="contentbox">
              <p id="text-border">③ MINT your Membership</p>
              <Button variant="contained" onClick={mintTWINMBRSHP} style={{ color: "#ffffff", backgroundColor: "#444" }}>mint Membership</Button>
            </div>
          </div>
          <div id="imgBox">
            <Video />
          </div>
        </Grid>
      </Grid> 
    </div>
  )
}

export default App;