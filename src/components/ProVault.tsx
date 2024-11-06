import React, { useEffect, useState } from "react";
// @ts-ignore
import { ChainId } from "@factordao/sdk";
// @ts-ignore
import { StudioProVaultStats, Vault } from "@factordao/sdk-studio";
// @ts-ignore
import { useAccount } from "wagmi";
// @ts-ignore
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ProWithdrawModal from "./modals/ProWithdrawModal";
import ProDepositModal from "./modals/ProDepositModal";

const ProVault: React.FC = () => {
  const { address, isConnected } = useAccount();
  const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
  const [selectedVault, setSelectedVault] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [availableVaults, setAvailableVaults] = useState<Vault[]>([]);

  useEffect(() => {
    const fetchAvailableVaults = async () => {
      if (!address) return;
      const proVaultStats = new StudioProVaultStats({
        chainId: ChainId.ARBITRUM_ONE,
        environment: "production",
      });
      const vaults = await proVaultStats.getAllVaults();
      setAvailableVaults(vaults);
    };

    if (isConnected) {
      fetchAvailableVaults();
    }
  }, [address, isConnected, alchemyApiKey]);

  const openModal = (positionAddress: string, action: string) => {
    setSelectedVault(positionAddress);
    setSelectedAction(action);
  };

  const closeModal = () => {
    setSelectedVault(null);
    setSelectedAction(null);
  };

  return (
    <div>
      <div className="connect-button-container">
        <ConnectButton />
      </div>
      <hr />
      {isConnected && (
        <div>
          <h2>Pro Vaults</h2>
          {availableVaults.map((vault) => (
            <div key={vault.address}>
              <h5>{vault.address}</h5>
              <p>deployed at {vault.block}</p>
              <button onClick={() => openModal(vault.address, "deposit")}>
                Deposit
              </button>
              <button onClick={() => openModal(vault.address, "withdraw")}>
                Withdraw
              </button>
              <hr />
            </div>
          ))}
        </div>
      )}
      {selectedVault && selectedAction === "withdraw" && (
        <ProWithdrawModal
          positionAddress={selectedVault}
          onClose={closeModal}
        />
      )}
      {selectedVault && selectedAction === "deposit" && (
        <ProDepositModal positionAddress={selectedVault} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProVault;
