import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import UserPositions from "./components/UserPositions"; // Import the new component

const config = getDefaultConfig({
  appName: "Studio Examples",
  projectId: "7e77a478e8155a93da131897bde6b0c5",
  chains: [arbitrum],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <UserPositions />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
