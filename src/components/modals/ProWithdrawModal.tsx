import React, { useEffect, useState } from "react";
// @ts-ignore
import { StudioProVault, StudioProVaultStats, VaultWithdraw } from "@factordao/sdk-studio";
// @ts-ignore
import { ChainId } from "@factordao/sdk";
// @ts-ignore
import {
  useSendTransaction,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Address } from "viem";
// @ts-ignore

interface ProWithdrawModalProps {
  positionAddress: string;
  onClose: () => void;
}

const ProWithdrawModal: React.FC<ProWithdrawModalProps> = ({
  positionAddress,
  onClose,
}) => {
  const { address, isConnected } = useAccount();
  const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
  const [tokenAddress, setTokenAddress] = useState("");
  const [vaultData, setVaultData] = useState<string | null>(null);
  const [availableAssets, setAvailableAssets] = useState<string[]>([]);
  const [shares, setShares] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { sendTransactionAsync } = useSendTransaction();

  const [withdrawHash, setWithdrawHash] = useState<`0x${string}` | undefined>();
  const [isWaitingForWithdraw, setIsWaitingForWithdraw] = useState(false);
  const [userWithdraws, setUserWithdraws] = useState<VaultWithdraw[]>([]);

  const { data: withdrawReceipt } = useWaitForTransactionReceipt({
    hash: withdrawHash,
  });

  useEffect(() => {
    const getVaultData = async () => {
      if (!address) return;
      const proVault = new StudioProVault({
        chainId: ChainId.ARBITRUM_ONE,
        vaultAddress: positionAddress,
      });
      const vaultData = await proVault.getVaultData();
      setVaultData(JSON.stringify(vaultData, null, 2));
      const shares = await proVault.balanceOf(address);
      console.log("Shares:", shares);
      setShares(shares);
      const assets = [];
      for (const k in vaultData.financial.underlyingAssets) {
        assets.push(vaultData.financial.underlyingAssets[k].address);
        if (!tokenAddress) {
          setTokenAddress(vaultData.financial.underlyingAssets[k].address);
        }
      }
      const proVaultStats = new StudioProVaultStats({
        chainId: ChainId.ARBITRUM_ONE,
        vaultAddress: positionAddress,
      });
      const withdrawsByUser = await proVaultStats.getVaultWithrawalsByReceiver(
        address
      );
      console.log("Withdraws by user: ", withdrawsByUser);
      setUserWithdraws(withdrawsByUser);
      setAvailableAssets(assets);
    };

    if (isConnected) {
      getVaultData();
    }
  }, [address, isConnected, alchemyApiKey]);

  // Handle withdraw receipt watching
  useEffect(() => {
    if (isWaitingForWithdraw && withdrawReceipt) {
      console.log("Withdraw confirmed:", withdrawReceipt);
      setIsWaitingForWithdraw(false);
      setWithdrawHash(undefined);
      onClose();
    }
  }, [withdrawReceipt, isWaitingForWithdraw]);

  const handleWithdraw = async () => {
    try {
      const proVault = new StudioProVault({
        chainId: ChainId.ARBITRUM_ONE,
        vaultAddress: positionAddress,
      });
      console.log("Withdrawing ", amount, " of ", tokenAddress);
      const withdrawData = proVault.withdrawAsset({
        assetAddress: tokenAddress as Address,
        shareAmountBN: amount,
        depositorAddress: address as Address,
        receiverAddress: address as Address,
      });

      console.log("Withdraw data: ", withdrawData);
      const hash = await sendTransactionAsync(withdrawData);
      console.log("Withdraw transaction sent: ", hash);

      setWithdrawHash(hash);
      setIsWaitingForWithdraw(true);
    } catch (error) {
      console.error("Withdraw failed:", error);
      setIsWaitingForWithdraw(false);
      setWithdrawHash(undefined);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Vault</h2>
        <pre>{vaultData}</pre>
        <h3>User Shares: {shares.toString()}</h3>
        <h3>User Withdraws</h3>
        <table className="deposit-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Amount</th>
              <th>Block</th>
              <th>Shares</th>
            </tr>
          </thead>
          <tbody>
            {userWithdraws.map((withdraw) => (
              <tr key={withdraw.block}>
                <td>
                  {withdraw.withdrawAsset.substring(0, 4)}...
                  {withdraw.withdrawAsset.substring(
                    withdraw.withdrawAsset.length - 3
                  )}
                </td>
                <td>{withdraw.assets}</td>
                <td>{withdraw.block}</td>
                <td>{withdraw.shares}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Withdraw shares</h3>
        <select
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        >
          {availableAssets.map((asset) => (
            <option key={asset} value={asset}>
              {asset}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleWithdraw}
          disabled={isWaitingForWithdraw}
          style={{
            opacity: isWaitingForWithdraw ? 0.5 : 1,
            cursor: isWaitingForWithdraw ? "not-allowed" : "pointer",
          }}
        >
          {isWaitingForWithdraw
            ? "Waiting for withdraw confirmation..."
            : "Withdraw"}
        </button>
      </div>
    </div>
  );
};

export default ProWithdrawModal;
