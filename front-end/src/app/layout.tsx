"use client";

import "./globals.css";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
} from "@thirdweb-dev/react";
import Nav from "@/components/common/Nav";

// export const metadata: Metadata = {
//   title: "Token Fest",
//   description: "TokenFest A Dao NFT where people make there dreams real",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Token Fest</title>
      <ThirdwebProvider
        activeChain="mumbai"
        clientId="5be238b6d90aced04e9db46730f231da"
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({ recommended: true }),
          walletConnect(),
          embeddedWallet(),
        ]}
      >
        <body className="font-raleway text-sm text-gray-800">
          <Nav />
          <div>{children}</div>
        </body>
      </ThirdwebProvider>
    </html>
  );
}
