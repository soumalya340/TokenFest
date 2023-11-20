"use client";

import { useProposal } from "@/ContextProviders/ProposalProvider";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import notFound from "@/components/Empty/notFound.json";
import Button from "@/components/common/Button";
import { ethers } from "ethers";
import TokenStarterCollab from "@/abi/TokenStarterCollab.json";
import MyTokenABI from "@/abi/MyToken.json";
import { enqueueSnackbar } from "notistack";

let erc20ContractAddress = "";
let stakingContractAddress = "";
let provider: ethers.providers.Web3Provider | null = null;
let signer = null;
let erc20Contract: ethers.Contract;
let stakingContract: ethers.Contract;
const Crowdfunding = () => {
  const [mintingDone, setMintingDone] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);

  // ------------------------
  const [salePrice, setSalePrice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [crowdFundingGoal, setCrowdFundingGoal] = useState<string | null>(null);
  const [totalFunding, setTotalFunding] = useState<string | null>(null);
  const [connectedNetwork, setConnectedNetwork] = useState<number | null>(null);
  const [isCreatorAlreadyStaked, setIsCreatorAlreadyStaked] = useState(false);

  const { proposal } = useProposal();

  // contractAddress = "0x4CCb3986b89bF1011A41A219024a9CD3E1a9EA7e"

  // --------------------------
  useEffect(() => {
    // erc20ContractAddress = "0x8563F7BD1fa85cB75EFB8e710D3971dC3e3C5C8b";
    stakingContractAddress = "0x4CCb3986b89bF1011A41A219024a9CD3E1a9EA7e";

    if (typeof window !== "undefined" && window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("done");
      setIsLoading(false);
      // const erc20Contract = new ethers.Contract(
      //   erc20ContractAddress,
      //   MyTokenABI,
      //   signer
      // );
      stakingContract = new ethers.Contract(
        stakingContractAddress,
        TokenStarterCollab,
        signer
      );

      console.log(stakingContract);
    }
  }, []);

  // --------------------------

  useEffect(() => {
    async function getNetwork() {
      if (provider) {
        const network = await provider.getNetwork();
        setConnectedNetwork(network.chainId);
      }
    }
    getNetwork();
  }, [provider]);

  // ------------
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const price = await stakingContract.salePrice();
  //       setSalePrice(ethers.utils.formatEther(price));

  //       const goal = await stakingContract.crowdFundingGoal();
  //       setCrowdFundingGoal(ethers.utils.formatEther(goal));

  //       const totalSupply = await stakingContract.totalSupply();
  //       const nftFunding = totalSupply.mul(price);

  //       let total = nftFunding;

  //       if (isCreatorAlreadyStaked) {
  //         const stakedAmount = goal
  //           .mul(ethers.BigNumber.from("20"))
  //           .div(ethers.BigNumber.from("100"));
  //         total = total.add(stakedAmount);
  //       }

  //       setTotalFunding(ethers.utils.formatEther(total));
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //     setIsLoading(false);
  //   }
  //   fetchData();
  // }, [stakingContract, isCreatorAlreadyStaked]);

  // -------------------------

  // ----------------
  // useEffect(() => {
  //   async function checkIsCreatorStaked() {
  //     try {
  //       const staked = await stakingContract.isCreatorStaked();
  //       setIsCreatorAlreadyStaked(staked);
  //     } catch (error: any) {
  //       console.error("Error checking if creator is staked:", error.message);
  //     }
  //   }

  //   if (proposal) {
  //     checkIsCreatorStaked();
  //   }
  // }, [proposal, stakingContract]);
  // ------------
  async function handleMint() {
    try {
      // const weiSalePrice = ethers.utils.parseEther(salePrice!);

      // Mint the token
      const mintTx = await stakingContract.mintTicket();

      await mintTx.wait();

      // display post minting button options
      setMintingDone(true);
      enqueueSnackbar(`Token minted successfully!`, {
        variant: "success",
      });
    } catch (error: any) {
      console.log(error);
      //   toast.error(`Error: ${error.message}`, {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 5000,
      //   });
      setMintingDone(true);
    }
  }
  // ---------
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // ----------------
  // ---------------------
  if (!proposal)
    return (
      <div className="flex flex-col gap-4 justify-center items-center mt-20">
        <Lottie animationData={notFound} loop={true} />
        <div className="text-lg">No Crowdfunding Event</div>
      </div>
    );
  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="w-[500px] text-sm border rounded-sm border-white/20 px-4 py-4 flex flex-col gap-4">
          <div className="text-xl font-bold">{proposal.title}</div>
          <p>{proposal.description}</p>

          {/* -------------------  */}
          {/* <div>
            {mintingDone ? (
              <div className="flex gap-3">
                <Button variant="secondary" size="sm">
                  Withdraw Funds
                </Button>
                <Button variant="secondary" size="sm">
                  Dispute
                </Button>
                <Button variant="secondary" size="sm">
                  Claimback
                </Button>
              </div>
            ) : (
              <div className="mt-4">
                <Button variant="primary" size="md" onClick={handleMint}>
                  {isMinting ? "Minting..." : "  Mint NFT"}
                </Button>
              </div>
            )}
          </div> */}
          {/* -------------------  */}
          <Button variant="primary" size="md" onClick={handleMint}>
            {isMinting ? "Minting..." : "  Mint NFT"}
          </Button>
          <div className="mt-4">
            <p>Funding Progress:</p>
            <div className="w-full h-4 bg-gray-300 rounded">
              <div
                style={{ width: `${5}%` }}
                className="h-full bg-blue-500 rounded"
              ></div>
            </div>
            <p>{2 / 5} ETH</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crowdfunding;
