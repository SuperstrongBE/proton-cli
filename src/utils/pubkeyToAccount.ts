import { LIGHT_CLIENT_ENDPOINTS } from "../constants";

export async function pubKeyToAccount(
  publicKey: string,
  chain: string,
  accountFilter?: string
) {
  const responseRoot = chain === "proton-test" ? "protontest" : "proton";
  const endpoint = LIGHT_CLIENT_ENDPOINTS.find(
    (endpoint) => endpoint.chain === chain
  )?.endpoints;
  try {
    return fetch(`${endpoint}/api/key/${publicKey}`)
      .catch((err) => {
        return null;
      })
      .then((res) => res?.json() ?? null)
      .then((data) => {
        if (!data) return null;
        if (!data[responseRoot] || !data[responseRoot].accounts) return null;
        let accounts = Object.keys(data[responseRoot].accounts);
        if (accounts.length === 0) return null;
        if (accountFilter) {
          const filteredAccounts = accounts.filter((account) => {
            return account.includes(accountFilter);
          });
          if (filteredAccounts.length === 0) return null;
          accounts = filteredAccounts;
        }
        return accounts;
      });
  } catch (err) {
    return null;
  }
}
