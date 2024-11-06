import React, { useEffect, useState } from "react";
import {
  StudioProVault,
  StudioProVaultStats,
  VaultDeposit,
} from "@factordao/sdk-studio";
import { ChainId, valueToBigInt } from "@factordao/sdk";
import {
  useSendTransaction,
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { erc20ABI } from "@factordao/contracts";
import { Address } from "viem";
import { arbitrum } from "wagmi/chains";

interface ProDepositModalProps {
  positionAddress: string;
  onClose: () => void;
}

const ProDepositModal: React.FC<ProDepositModalProps> = ({
  positionAddress,
  onClose,
}) => {
  const { address, isConnected } = useAccount();
  const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
  const [tokenAddress, setTokenAddress] = useState("");
  const [vaultData, setVaultData] = useState<string | null>(null);
  const [availableAssets, setAvailableAssets] = useState<string[]>([]);
  const [amount, setAmount] = useState<string>("");
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  const [allowanceHash, setAllowanceHash] = useState<
    `0x${string}` | undefined
  >();
  const [depositHash, setDepositHash] = useState<`0x${string}` | undefined>();
  const [isWaitingForAllowance, setIsWaitingForAllowance] = useState(false);
  const [isWaitingForDeposit, setIsWaitingForDeposit] = useState(false);
  const [userDeposits, setUserDeposits] = useState<VaultDeposit[]>([]);

  const { data: allowanceReceipt } = useWaitForTransactionReceipt({
    hash: allowanceHash,
  });

  const { data: depositReceipt } = useWaitForTransactionReceipt({
    hash: depositHash,
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
      const assets = [];
      for (const k in vaultData.financial.underlyingAssets) {
        assets.push(vaultData.financial.underlyingAssets[k].address);
        if (!tokenAddress) {
          setTokenAddress(vaultData.financial.underlyingAssets[k].address);
        }
      }
      const proVaultStats = new StudioProVaultStats({
        chainId: ChainId.ARBITRUM_ONE,
        vaultAddress: positionAddress as Address,
        environment: "testing",
      });
      const depositsByUser = await proVaultStats.getVaultDepositsByOwner(
        address
      );
      console.log("Deposits by user: ", depositsByUser);
      setUserDeposits(depositsByUser);
      setAvailableAssets(assets);
    };

    if (isConnected) {
      getVaultData();
    }
  }, [address, isConnected, alchemyApiKey]);

  // Handle allowance receipt watching
  useEffect(() => {
    if (isWaitingForAllowance && allowanceReceipt) {
      console.log("Allowance confirmed:", allowanceReceipt);
      handleDeposit();
      setIsWaitingForAllowance(false);
      setAllowanceHash(undefined);
    }
  }, [allowanceReceipt, isWaitingForAllowance]);

  // Handle deposit receipt watching
  useEffect(() => {
    if (isWaitingForDeposit && depositReceipt) {
      console.log("Deposit confirmed:", depositReceipt);
      setIsWaitingForDeposit(false);
      setDepositHash(undefined);
      onClose();
    }
  }, [depositReceipt, isWaitingForDeposit]);

  const handleAllowance = async () => {
    try {
      const allowance = await writeContractAsync({
        address: tokenAddress as Address,
        abi: erc20ABI,
        functionName: "approve",
        chain: arbitrum,
        account: address,
        args: [positionAddress as Address, valueToBigInt(amount)],
      });
      console.log("Allowance transaction sent:", allowance);

      setAllowanceHash(allowance);
      setIsWaitingForAllowance(true);
    } catch (error) {
      console.error("Approval failed:", error);
      setIsWaitingForAllowance(false);
      setAllowanceHash(undefined);
    }
  };

  const handleDeposit = async () => {
    try {
      const proVault = new StudioProVault({
        chainId: ChainId.ARBITRUM_ONE,
        vaultAddress: positionAddress,
      });

      const depositData = proVault.depositAsset({
        assetAddress: tokenAddress,
        amountBN: amount,
        receiverAddress: address,
      });

      console.log("Deposit data: ", depositData);
      const hash = await sendTransactionAsync(depositData);
      console.log("Deposit transaction sent: ", hash);

      setDepositHash(hash);
      setIsWaitingForDeposit(true);
    } catch (error) {
      console.error("Deposit failed:", error);
      setIsWaitingForDeposit(false);
      setDepositHash(undefined);
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
        <h3>User Deposits</h3>
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
            {userDeposits.map((deposit) => (
              <tr key={deposit.block}>
                <td>
                  {deposit.depositAsset.substring(0, 4)}...
                  {deposit.depositAsset.substring(
                    deposit.depositAsset.length - 3
                  )}
                </td>
                <td>{deposit.assets}</td>
                <td>{deposit.block}</td>
                <td>{deposit.shares}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Deposit</h3>

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
          onClick={handleAllowance}
          disabled={isWaitingForAllowance || isWaitingForDeposit}
          style={{
            opacity: isWaitingForAllowance || isWaitingForDeposit ? 0.5 : 1,
            cursor:
              isWaitingForAllowance || isWaitingForDeposit
                ? "not-allowed"
                : "pointer",
          }}
        >
          {isWaitingForAllowance
            ? "Waiting for approval confirmation..."
            : isWaitingForDeposit
            ? "Waiting for deposit confirmation..."
            : "Deposit"}
        </button>
      </div>
    </div>
  );
};

export default ProDepositModal;
