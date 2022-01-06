const ethers = require('ethers')
const KEY_GRANTER_PRIVATE_KEY = require('../constants').KEY_GRANTER_PRIVATE_KEY
const RPC_PROVIDER = require('../constants').RPC_PROVIDER
const BASE_DURATION = require('../constants').BASE_DURATION
const BASE_DURATION_ENGLISH = require('../constants').BASE_DURATION_ENGLISH
const LOCK_ADDRESS = require('../constants').LOCK_ADDRESS

const abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: 'address[]',
        name: '_recipients',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_expirationTimestamps',
        type: 'uint256[]',
      },
      {
        internalType: 'address[]',
        name: '_keyManagers',
        type: 'address[]',
      },
    ],
    name: 'grantKeys',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  'function keyExpirationTimestampFor(address _owner) constant view returns (uint256 timestamp)',
]

const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER)


/**
* function to grant a key!
* @param {*} recipient
*/
const grant = async (recipient) => {
  const wallet = new ethers.Wallet(KEY_GRANTER_PRIVATE_KEY)
  const signer = wallet.connect(provider)
  const lock = new ethers.Contract(LOCK_ADDRESS, abi, signer)
  const expiration = Math.floor(new Date().getTime() / 1000 + BASE_DURATION)
  // We keep the key manager role
  const tx = await lock.grantKeys([recipient], [expiration], [signer.address])
  return tx
}

/**
* Yields the expiration for a member!
* @param {*} address
* @returns
*/
const keyExpirationFor = async (address) => {
  console.log(LOCK_ADDRESS)
  const lock = new ethers.Contract(
    LOCK_ADDRESS,
    abi,
    provider)
  const expiration = await lock.keyExpirationTimestampFor(address)
  return expiration.toNumber()
}


module.exports = {
  grant,
  keyExpirationFor
}
