import React, { useState } from "react";
// @ts-ignore
import { StrategyBuilder } from "@factordao/sdk-studio";
// @ts-ignore
import { ChainId } from "@factordao/sdk";
// @ts-ignore
import { useSendTransaction } from "wagmi";

interface WithdrawModalProps {
  positionAddress: string;
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  positionAddress,
  onClose,
}) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const { sendTransaction } = useSendTransaction();

  const handleWithdraw = async () => {
    // Implement the withdraw logic here
    console.log(
      "Withdrawing from:",
      positionAddress,
      "with token:",
      tokenAddress
    );
    const sb = new StrategyBuilder({
      chainId: ChainId.ARBITRUM_ONE,
      environment: "staging",
      positionAddress,
    });

    // Defining the strategy

    sb.adapter.refund.refundAll({
      tokenAddress: tokenAddress,
    });
    const strategyData = sb.build();
    console.log("Strategy data: ", strategyData);
    const hash = await sendTransaction(strategyData);
    console.log("Transaction sent: ", hash);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Withdraw from Position</h2>
        <p>Position Address: {positionAddress}</p>
        <input
          type="text"
          placeholder="Enter Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </div>
  );
};

export default WithdrawModal;
