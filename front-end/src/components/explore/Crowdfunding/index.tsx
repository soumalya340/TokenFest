"use client";

import { useProposal } from "@/ContextProviders/ProposalProvider";
import { useState } from "react";
import Lottie from "lottie-react";
import notFound from "@/components/Empty/notFound.json";
import Button from "@/components/common/Button";

const Crowdfunding = () => {
  const [mintingDone, setMintingDone] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const { proposal } = useProposal();

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
        <div className="w-[500px] text-white/80 text-sm border rounded-sm border-white/20 px-4 py-4 flex flex-col gap-4">
          <div className="text-xl font-bold">{proposal.title}</div>
          <p>{proposal.description}</p>

          {/* -------------------  */}
          <div>
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
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => console.log("yes")}
                >
                  {isMinting ? "Minting..." : "  Mint NFT"}
                </Button>
              </div>
            )}
          </div>
          {/* -------------------  */}

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
