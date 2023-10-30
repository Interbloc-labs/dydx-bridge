import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import Form from "./components/Form/Form";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Header } from "./components/Header/Header";
import { ChainProvider } from "@cosmos-kit/react";
// import { wallets } from "cosmos-kit";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as cosmostationWallets } from "@cosmos-kit/cosmostation";
import { wallets as ledgerWallets } from "@cosmos-kit/ledger";
import { wallets as leapWallets } from "@cosmos-kit/leap";

import "@interchain-ui/react/styles";

// import { chains as cosmosChains, assets } from "chain-registry";
// import { wallets } from "@cosmos-kit/";
import { ChainRegistryClient } from "@chain-registry/client";
import { ChakraProvider } from "@chakra-ui/react";

// create an instance of ChainRegistryClient by passing in the chain names

const defaultTheme = createTheme();

const projectId = "6da84c452ca677f10d064b6334d80f0e";

// 2. Create wagmiConfig
const metadata = {
  name: "Dydx Bridge by Interbloc",
  description: "",
  url: "https://dydxbridge.interbloc.com",
  icons: [
    "https://explorer.interbloc.org/_next/static/media/logo.240bcc41.svg",
  ],
};

const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

export const DYDX_TOKEN_ADDRESS = "0x92D6C1e31e14520e676a687F0a93788B716BEff5";

// 3. Create modal
createWeb3Modal({
  themeMode: "light",
  wagmiConfig,
  projectId,
  chains,
  tokens: {
    // {
    //   address: "0x46b2DeAe6eFf3011008EA27EA36b7c27255ddFA9",
    //   image:
    //     "https://assets.coingecko.com/coins/images/17500/standard/hjnIm9bV.jpg?1696517040",
    // },
    // 1: {
    //   address: DYDX_TOKEN_ADDRESS,
    //   image:
    //     "https://assets.coingecko.com/coins/images/17500/standard/hjnIm9bV.jpg?1696517040",
    // },
  },
});

function App() {
  const [dydxChainInfo, setDydxChainInfo] =
    React.useState<ReturnType<ChainRegistryClient["getChain"]>>();
  const [dydxAssetList, setDydxAssetList] =
    React.useState<ReturnType<ChainRegistryClient["getChainAssetList"]>>();

  const [cosmosKitClient, setCosmosKitClient] = useState(
    new ChainRegistryClient({
      chainNames: ["dydx"],
    })
  );

  useEffect(() => {
    // chain info, assets and ibc data will be downloaded dynamically by invoking fetchUrls method
    cosmosKitClient.fetchUrls().then(async (urls) => {
      // console.log(urls);
      // get chain data
      setDydxChainInfo(cosmosKitClient.getChain("dydx"));
      // get asset list
      setDydxAssetList(cosmosKitClient.getChainAssetList("dydx"));
    });
  }, []);

  console.log(dydxChainInfo, dydxAssetList);

  return (
    <ChakraProvider>
      <ChainProvider
        chains={[
          dydxChainInfo || {
            $schema: "../chain.schema.json",
            chain_name: "dydx",
            status: "live",
            website: "https://dydx.exchange/",
            network_type: "mainnet",
            pretty_name: "dYdX Protocol",
            chain_id: "dydx-mainnet-1",
            bech32_prefix: "dydx",
            daemon_name: "dydxprotocold",
            node_home: "$HOME/.dydxprotocol",
            key_algos: ["secp256k1"],
            slip44: 118,
            fees: {
              fee_tokens: [
                {
                  denom: "adydx",
                  fixed_min_gas_price: 12500000000,
                  low_gas_price: 12500000000,
                  average_gas_price: 12500000000,
                  high_gas_price: 20000000000,
                },
                {
                  denom:
                    "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
                  fixed_min_gas_price: 0.025,
                  low_gas_price: 0.025,
                  average_gas_price: 0.025,
                  high_gas_price: 0.03,
                },
              ],
            },
            staking: {
              staking_tokens: [
                {
                  denom: "adydx",
                },
              ],
            },
            codebase: {
              git_repo: "https://github.com/dydxprotocol/v4-chain/",
              recommended_version: "v1.0.0",
              compatible_versions: ["v1.0.0"],
              cosmos_sdk_version: "v0.47.4",
              cosmwasm_enabled: false,
              genesis: {
                genesis_url:
                  "https://raw.githubusercontent.com/dydxopsdao/networks/main/dydx-mainnet-1/genesis.json",
              },
              versions: [
                {
                  name: "v1",
                  recommended_version: "v1.0.0",
                  compatible_versions: ["v1.0.0"],
                  cosmos_sdk_version: "v0.47.4",
                },
              ],
            },
            logo_URIs: {
              png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png",
              svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.svg",
            },
            peers: {
              seeds: [
                {
                  id: "20e1000e88125698264454a884812746c2eb4807",
                  address: "seeds.lavenderfive.com:23856",
                  provider: "Lavender.Five Nodes 🐝",
                },
                {
                  id: "ebc272824924ea1a27ea3183dd0b9ba713494f83",
                  address: "dydx-mainnet-seed.autostake.com:27366",
                  provider: "AutoStake 🛡️ Slash Protected",
                },
                {
                  id: "65b740ee326c9260c30af1f044e9cda63c73f7c1",
                  address: "seeds.kingnodes.net:23856",
                  provider: "Kingnodes",
                },
                {
                  id: "4c30c8a95e26b07b249813b677caab28bf0c54eb",
                  address: "rpc.dydx.nodestake.top:666",
                  provider: "NodeStake",
                },
              ],
              persistent_peers: [
                {
                  id: "ebc272824924ea1a27ea3183dd0b9ba713494f83",
                  address: "dydx-mainnet-peer.autostake.com:27366",
                  provider: "AutoStake 🛡️ Slash Protected",
                },
              ],
            },
            apis: {
              rpc: [
                {
                  address: "https://dydx-rpc.lavenderfive.com:443",
                  provider: "Lavender.Five Nodes 🐝",
                },
                {
                  address: "https://dydx-mainnet-rpc.autostake.com:443",
                  provider: "AutoStake 🛡️ Slash Protected",
                },
                {
                  address: "https://rpc-dydx.ecostake.com:443",
                  provider: "ecostake",
                },
                {
                  address: "https://rpc.dydx.nodestake.top:443",
                  provider: "NodeStake",
                },
              ],
              rest: [
                {
                  address: "https://dydx-api.lavenderfive.com:443",
                  provider: "Lavender.Five Nodes 🐝",
                },
                {
                  address: "https://dydx-mainnet-lcd.autostake.com:443",
                  provider: "AutoStake 🛡️ Slash Protected",
                },
                {
                  address: "https://rest-dydx.ecostake.com:443",
                  provider: "ecostake",
                },
                {
                  address: "https://api.dydx.nodestake.top:443",
                  provider: "NodeStake",
                },
              ],
              grpc: [
                {
                  address: "https://dydx-grpc.lavenderfive.com",
                  provider: "Lavender.Five Nodes 🐝",
                },
                {
                  address: "dydx-mainnet-grpc.autostake.com:443",
                  provider: "AutoStake 🛡️ Slash Protected",
                },
                {
                  address: "https://grpc.dydx.nodestake.top",
                  provider: "NodeStake",
                },
              ],
            },
            explorers: [
              {
                kind: "mintscan",
                url: "https://www.mintscan.io/dydx",
                tx_page: "https://www.mintscan.io/dydx/txs/${txHash}",
                account_page:
                  "https://www.mintscan.io/dydx/account/${accountAddress}",
              },
              {
                kind: "NodeStake",
                url: "https://explorer.nodestake.top/dydx/",
                tx_page: "https://explorer.nodestake.top/dydx/txs/${txHash}",
                account_page:
                  "https://explorer.nodestake.top/dydx/account/${accountAddress}",
              },
            ],
            images: [
              {
                png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png",
                svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.svg",
              },
            ],
          },
        ]} // supported chains
        assetLists={[
          dydxAssetList || {
            $schema: "../assetlist.schema.json",
            chain_name: "dydx",
            assets: [
              {
                description: "The native staking token of dYdX Protocol.",
                denom_units: [
                  {
                    denom: "adydx",
                    exponent: 0,
                  },
                  {
                    denom: "dydx",
                    exponent: 18,
                  },
                ],
                base: "adydx",
                name: "dYdX",
                display: "dydx",
                symbol: "DYDX",
                logo_URIs: {
                  png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png",
                  svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.svg",
                },
                coingecko_id: "dydx",
                images: [
                  {
                    png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.png",
                    svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx.svg",
                  },
                  {
                    svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/dydx/images/dydx-circle.svg",
                    theme: {
                      circle: true,
                    },
                  },
                ],
              },
              {
                description: "Noble USDC on dYdX Protocol.",
                denom_units: [
                  {
                    denom:
                      "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
                    exponent: 0,
                  },
                  {
                    denom: "usdc",
                    exponent: 18,
                  },
                ],
                type_asset: "ics20",
                base: "ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5",
                name: "Noble USDC",
                display: "usdc",
                symbol: "USDC",
                traces: [
                  {
                    type: "ibc",
                    counterparty: {
                      chain_name: "noble",
                      base_denom: "uusdc",
                      channel_id: "channel-33",
                    },
                    chain: {
                      channel_id: "channel-0",
                      path: "transfer/channel-0",
                    },
                  },
                ],
                images: [
                  {
                    png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.png",
                    svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.svg",
                  },
                ],
                logo_URIs: {
                  png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.png",
                  svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.svg",
                },
              },
            ],
          },
        ]} // supported asset lists
        wallets={[
          ...keplrWallets,
          ...leapWallets,
          ...cosmostationWallets,
          ...ledgerWallets,
        ]} // supported wallets
        walletConnectOptions={{
          signClient: {
            projectId,
            relayUrl: "wss://relay.walletconnect.org",
            metadata: {
              name: "DYDX Bridge by Interbloc",
              description: "",
              url: "https://bridge.interbloc.com/",
              icons: [
                "https://explorer.interbloc.org/_next/static/media/logo.240bcc41.svg",
              ],
            },
          },
        }}
      >
        <WagmiConfig config={wagmiConfig}>
          <ThemeProvider theme={defaultTheme}>
            <Header />
            <Container component="main" maxWidth="xs">
              <Form />
            </Container>
          </ThemeProvider>
        </WagmiConfig>
      </ChainProvider>
    </ChakraProvider>
  );
}

export default App;
