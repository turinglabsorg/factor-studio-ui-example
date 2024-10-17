import React, { useEffect, useState } from "react";
// @ts-ignore
import { ChainId } from "@factordao/sdk";
// @ts-ignore
import { StrategyBuilderVault } from "@factordao/sdk-studio";
// @ts-ignore
import { useAccount } from "wagmi";
// @ts-ignore
import { ConnectButton } from "@rainbow-me/rainbowkit";
import WithdrawModal from "./WithdrawModal"; // Import the modal component

const UserPositions: React.FC = () => {
  const { address, isConnected } = useAccount();
  const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
  const [userPositions, setUserPositions] = useState<any[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPositions = async () => {
      if (!address) return;

      const sbVault = new StrategyBuilderVault({
        chainId: ChainId.ARBITRUM_ONE,
        environment: "staging",
      });

      // fetch user positions
      const positions = await sbVault.getUserPositions({
        userAddress: address,
        alchemyApiKey,
      });
      setUserPositions(positions);
    };

    if (isConnected) {
      fetchUserPositions();
    }
  }, [address, isConnected, alchemyApiKey]);

  const openModal = (positionAddress: string) => {
    setSelectedPosition(positionAddress);
  };

  const closeModal = () => {
    setSelectedPosition(null);
  };

  return (
    <div>
      <div className="connect-button-container">
        <ConnectButton />
      </div>
      <hr />
      {isConnected && (
        <table className="user-positions-table">
          <thead>
            <tr>
              <th>Position ID</th>
              <th>Position Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userPositions.map((position, index) => (
              <tr key={index}>
                <td>{position.positionId}</td>
                <td>{position.positionAddress}</td>
                <td>
                  <button onClick={() => openModal(position.positionAddress)}>Withdraw</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedPosition && (
        <WithdrawModal positionAddress={selectedPosition} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserPositions;
