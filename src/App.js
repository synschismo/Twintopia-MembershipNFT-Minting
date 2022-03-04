import { useState } from "react";
import contractAbi from "./contracts/TwintopiaMembershipNFT.json"
import {ethers} from "ethers";
import Button from '@mui/material/Button';
import Video from './components/Video';
import Grid from '@mui/material/Grid';

//contract address
const contractAddress = "0xE124A870030307bba3899C81Cc766c7e85b137b7";
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

  const [inviteAddress, seetInviteAddress] = useState("");
  const inviteAddressChange = (e) => {
    seetInviteAddress(() => e.target.value);
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
      window.location.reload();
    } catch(err) {
      console.log(err);
    }
  }

  const invite = async () => {
    try {
      let _inviteAddress = inviteAddress;
      await contract.inviteAddress(_inviteAddress);
      window.location.reload();
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div id="intro">
        <h1>Twintopia Membership NFT</h1>
        <h3>You Got a Invitation. Let's Mint your Membership and <a href="https://t.co/4Qs5pWKol2">Join Discord.</a></h3>   
        <a id="link-text" href="https://synschismo.com">👉&ensp;synschismo Inc. website</a>
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
              <p>{walletAddress}</p>
              <Button id="button" variant="contained" onClick={connectWalletHandler} style={{ color: "#ffffff", backgroundColor: "#444" }}>Connect Wallet</Button>
            </div>
            <div id="contentbox">
              <p id="text-border">② Enter Twitter ID</p>
              <input id="text-fill" value={twtrId} onChange={twtrIdChange} type="text" />
            </div>
            <div id="contentbox">
              <p id="text-border">③ MINT your Membership</p>
              <Button variant="contained" onClick={ () => mintTWINMBRSHP(twtrId) } style={{ color: "#ffffff", backgroundColor: "#444" }}>mint Membership</Button>
              <p>Check your Membership at 👉&ensp;<a href="https://testnets.opensea.io/collection/twintopia-membership-rn9ndtpw8l" rel="noreferrer noopener">Opensea</a></p>
            </div>
            <div id="contentbox">
              <p id="text-border">④ Invite Friend's Address</p>
              <input id="text-fill" value={inviteAddress} onChange={inviteAddressChange} type="text" />
              <Button variant="contained" onClick={ () => invite(inviteAddress) } style={{ 'marginTop':"15px", color: "#ffffff", backgroundColor: "#444" }}>mint Membership</Button>
            </div>
          </div>
          <div id="imgBox">
            <Video id="video"/>
            <div id="metadataBox">
              <h2>Mint Membership</h2>
              <br></br>
              <div id="contentbox2">
                <p id="text-border">⑴ このMembership NFTでは、TwitterIDを紐づけることで、各メンバーのコミュニティを参照可能にします。</p>
                <p id="text-border">⑵ メンバーは、他の人を招待することができます。招待することで、「招待した数」が増えていきます。</p>
                <p id="text-border">⑶ プロパティ「Invited By」は誰に招待されたかが示されています。Opensea上で、同じ人に招待されたメンバーを参照することができます。</p>
                <p id="text-border">⑷ コミュニティに参加した日時も記録されます。参加日時と招待した数をもとに今後優先的なサービスを提供したいと考えています。</p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid> 
    </div>
  )
}

export default App;