import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import "antd-css-utilities/utility.min.css";
import "antd/dist/antd.css";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import React, { ReactNode, useMemo } from "react";
import { BaseLayout } from "~/components/layout/BaseLayout";
import "~/components/modals/InstructionsModal/index.css";
import "~/components/modals/WalletModal/index.css";
import { ModalProvider } from "~/contexts/ModalContext";
import "~/styles/global.css";

const WalletProvider = dynamic<{ children: ReactNode }>(
  () =>
    import("../contexts/WalletProvider").then(
      ({ WalletProvider }) => WalletProvider
    ),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <ModalProvider>
        <WalletProvider>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </WalletProvider>
      </ModalProvider>
    </ConnectionProvider>
  );
}