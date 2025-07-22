export const networks = [
  {
    chain: "proton",
    endpoints: ["https://proton.greymass.com"],
  },
  {
    chain: "proton-test",
    endpoints: [
      "https://protontestnet.ledgerwise.io",
      "https://proton-testnet.eosphere.io",
    ],
  },
];

export type ChainDiscoveryService = {
  chain: string;
  service_url: string;
};

export const EP_DISCOVERY: ChainDiscoveryService[] = [
  {
    chain: "proton",
    service_url: "https://danemarkbp.com/apis/get_json_mainnet.php?type=ssl",
  },

  {
    chain: "proton-test",
    service_url: "https://danemarkbp.com/apis/get_json_testnet.php?type=ssl",
  },
];

export const LIGHT_CLIENT_ENDPOINTS = [
  {
    chain: "proton",
    endpoints: "https://proton.light-api.net",
  },
  {
    chain: "proton-test",
    endpoints: "https://testnet-lightapi.eosams.xeos.me",
  },
];
