// Exercises the live coordinator reader against the deployed contracts on
// Creditcoin Testnet. Requires network access.
import {
  ChainReadUnavailableError,
  SettlementNotFoundError,
  readSettlementFromChain,
} from '../lib/handshake/chain-reader.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = '') => {
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

const config = {
  creditcoinRpcUrl: 'https://rpc.cc3-testnet.creditcoin.network',
  ethereumSepoliaRpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
  coordinatorAddress: '0x905E0f141D8B5333F49755B08395d1beAdEd74Ab',
  creditcoinLockAddress: '0xb3e9cB40A52EF777A29b6198f4c2D8d19893a01D',
  ethereumLockAddress: '0x999326d027316C6CD0156a39ac8d3792f2EFC802',
}

// An unregistered id must produce a not-found, not an empty-but-plausible record.
let notFound = false
try {
  await readSettlementFromChain('0x' + '11'.repeat(32), config)
} catch (error) {
  notFound = error instanceof SettlementNotFoundError
  if (notFound) console.log(`        (${(error as Error).message})`)
}
check('unregistered id yields SettlementNotFoundError', notFound)

// Missing config must refuse rather than degrade silently.
let refused = false
try {
  await readSettlementFromChain('0x' + '11'.repeat(32), { ...config, coordinatorAddress: null })
} catch (error) {
  refused = error instanceof ChainReadUnavailableError
}
check('missing coordinator address refuses', refused)

let rejected = false
try {
  await readSettlementFromChain('0xdeadbeef', config)
} catch (error) {
  rejected = error instanceof TypeError
}
check('malformed id rejected before any RPC call', rejected)

// The ABI must decode against the real deployed bytecode. A shape mismatch
// would surface here rather than as a blank UI.
const { Contract, JsonRpcProvider } = await import('ethers')
const provider = new JsonRpcProvider(config.creditcoinRpcUrl, undefined, { staticNetwork: true })
const { COORDINATOR_READ_ABI, LOCK_READ_ABI } = await import('../lib/handshake/abi.ts')
const coordinator = new Contract(config.coordinatorAddress, COORDINATOR_READ_ABI, provider)

const record = await coordinator.handshakes('0x' + '11'.repeat(32))
check('handshakes() decodes 11 fields', record.length === 11, `${record.length} fields`)

const timeout = Number(await coordinator.TIMEOUT())
check('TIMEOUT() matches the contract constant', timeout === 3600, `${timeout}s`)

const view = await coordinator.getHandshake('0x' + '11'.repeat(32))
check('getHandshake() decodes 8 fields', view.length === 8, `${view.length} fields`)

const committed = await coordinator.isCommitted('0x' + '11'.repeat(32))
check('isCommitted() returns false for an unknown id', committed === false)

const lock = new Contract(config.creditcoinLockAddress, LOCK_READ_ABI, provider)
const lockRecord = await lock.locks('0x' + '11'.repeat(32))
check('locks() decodes 6 fields', lockRecord.length === 6, `${lockRecord.length} fields`)

const sepolia = new JsonRpcProvider(config.ethereumSepoliaRpcUrl, undefined, { staticNetwork: true })
const ethLock = new Contract(config.ethereumLockAddress, LOCK_READ_ABI, sepolia)
const ethRecord = await ethLock.locks('0x' + '11'.repeat(32))
check('Sepolia locks() decodes 6 fields', ethRecord.length === 6)

const height = await provider.getBlockNumber()
check('coordinator chain is reachable', height > 0, `block ${height}`)

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
