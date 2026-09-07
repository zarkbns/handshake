import type { ChainRef } from './types'

/**
 * Chain registry mirroring `config/testnets.example.json`.
 *
 * Only public, non-sensitive values live here. RPC URLs and contract addresses
 * are read from `NEXT_PUBLIC_*` env vars at runtime — never inlined, and never
 * sourced from the backend's server-side `.env` keys (which include signer
 * private keys and must stay off the client entirely).
 */

export const CREDITCOIN: ChainRef = {
  id: 102031,
  key: 'creditcoin',
  name: 'Creditcoin Testnet',
  shortName: 'Creditcoin',
}

export const ETHEREUM_SEPOLIA: ChainRef = {
  id: 11155111,
  key: 'ethereum-sepolia',
  name: 'Ethereum Sepolia',
  shortName: 'ETH Sepolia',
}

export const CHAINS: ChainRef[] = [ETHEREUM_SEPOLIA, CREDITCOIN]

export const CHAINS_BY_KEY: Record<string, ChainRef> = Object.fromEntries(
  CHAINS.map((chain) => [chain.key, chain]),
)

/** Block explorers for read-only deep links. */
const EXPLORERS: Record<number, string> = {
  [CREDITCOIN.id]: 'https://creditcoin-testnet.blockscout.com',
  [ETHEREUM_SEPOLIA.id]: 'https://sepolia.etherscan.io',
}

export function explorerTxUrl(chainId: number, hash: string): string | null {
  const base = EXPLORERS[chainId]
  return base ? `${base}/tx/${hash}` : null
}

export function explorerAddressUrl(chainId: number, address: string): string | null {
  const base = EXPLORERS[chainId]
  return base ? `${base}/address/${address}` : null
}

/**
 * Finality buffer per attested source chain, from `config/testnets.example.json`.
 * Surfaced read-only in the UI so operators can see the reorg-resistance margin
 * the coordinator relies on. Changing it here changes nothing on chain.
 */
export const FINALITY_CONFIRMATIONS: Record<string, number> = {
  [ETHEREUM_SEPOLIA.key]: 12,
}

/** `HandshakeASC.TIMEOUT` — 1 hour, used for client-side countdown display only. */
export const COORDINATOR_TIMEOUT_SECONDS = 3600

/**
 * Public runtime configuration. Absent values are expected in a fresh checkout;
 * the data layer degrades to the sample source and says so in the UI.
 */
export interface PublicChainConfig {
  creditcoinRpcUrl: string | null
  ethereumSepoliaRpcUrl: string | null
  coordinatorAddress: string | null
  creditcoinLockAddress: string | null
  ethereumLockAddress: string | null
}

export function readPublicChainConfig(): PublicChainConfig {
  const value = (raw: string | undefined) => {
    const trimmed = raw?.trim()
    return trimmed ? trimmed : null
  }
  return {
    creditcoinRpcUrl: value(process.env.NEXT_PUBLIC_CREDITCOIN_RPC_URL),
    ethereumSepoliaRpcUrl: value(process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_RPC_URL),
    coordinatorAddress: value(process.env.NEXT_PUBLIC_HANDSHAKE_ASC_ADDRESS),
    creditcoinLockAddress: value(process.env.NEXT_PUBLIC_CREDITCOIN_LOCK_ADDRESS),
    ethereumLockAddress: value(process.env.NEXT_PUBLIC_ETHEREUM_LOCK_ADDRESS),
  }
}

/** True when a live coordinator lookup by settlement id is possible. */
export function canReadChain(config: PublicChainConfig): boolean {
  return Boolean(config.creditcoinRpcUrl && config.coordinatorAddress)
}
