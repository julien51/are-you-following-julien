const ethers = require('ethers')


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
const lockAddress = "0x19f11E9D43260411b29e538c489426e73e365B4a"
const duration = 60 * 60 // 1 hour!

const provider = new ethers.providers.JsonRpcProvider("https://rpc.xdaichain.com/")



/**
 * function to grant a key!
 * @param {*} recipient
 */
const grant = async (recipient) => {
  const wallet = new ethers.Wallet(process.env["KEY_GRANTER_PRIVATE_KEY"])
  const signer = wallet.connect(provider)
  const lock = new ethers.Contract(
    lockAddress,
    abi,
    signer
  )
  const expiration = Math.floor(
    new Date().getTime() / 1000 + duration
  )
  // I keep the manager role... to prevent cancellations/transfers
  const tx = await lock.grantKeys([recipient], [expiration], ["0xDD8e2548da5A992A63aE5520C6bC92c37a2Bcc44"])
  const receipt = await tx.wait()
  return receipt
}

/**
 * Yields the expiration for a member!
 * @param {*} address
 * @returns
 */
const keyExpirationFor = async (address) => {
  const lock = new ethers.Contract(
    lockAddress,
    abi,
    provider
  )
  const expiration = await lock.keyExpirationTimestampFor(address)
  return expiration.toNumber()
}


module.exports = {
  grant,
  keyExpirationFor
}
