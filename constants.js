const TWITTER_ID = 5381582;
const NAME = "Julien";
const WEBSITE = "https://www.ouvre-boite.com/";

// get these 2 from developer.twitter.com where your app info is
const TWITTER_CONSUMER_KEY = process.env["TWITTER_CONSUMER_KEY"];
const TWITTER_CONSUMER_SECRET = process.env["TWITTER_CONSUMER_SECRET"];

// Private key of the granter!
const KEY_GRANTER_PRIVATE_KEY = process.env["KEY_GRANTER_PRIVATE_KEY"];

// Network provider
const RPC_PROVIDER = "https://rpc.xdaichain.com/";

// Explorer base
const EXPLORER_TX_BASE = "https://blockscout.com/xdai/mainnet/";

// BASE_DURATION
const BASE_DURATION = 60 * 60; // 60 days!
const BASE_DURATION_ENGLISH = "1 hour"; // 60 minutes!

// LOCK_ADDRESS
const LOCK_ADDRESS = "0x19f11E9D43260411b29e538c489426e73e365B4a";

const CONSTANTS = {
  TWITTER_ID,
  NAME,
  WEBSITE,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  KEY_GRANTER_PRIVATE_KEY,
  RPC_PROVIDER,
  BASE_DURATION,
  BASE_DURATION_ENGLISH,
  LOCK_ADDRESS,
  EXPLORER_TX_BASE,
};

module.exports = CONSTANTS;
