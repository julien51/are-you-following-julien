
const TWITTER_ID = 11127012;
const NAME = "Protein";
const WEBSITE = "https://www.protein.xyz/";

// get these 2 from developer.twitter.com where your app info is
const TWITTER_CONSUMER_KEY = process.env["TWITTER_CONSUMER_KEY"];
const TWITTER_CONSUMER_SECRET = process.env["TWITTER_CONSUMER_SECRET"];

// Private key of the granter!
const KEY_GRANTER_PRIVATE_KEY = process.env['KEY_GRANTER_PRIVATE_KEY']

// Network provider
const RPC_PROVIDER = "https://polygon-rpc.com/"

// Explorer base
const EXPLORER_TX_BASE = "https://polygonscan.com/tx/"

// BASE_DURATION
const BASE_DURATION = 60 * 60 * 24 * 30 // 30 days!
const BASE_DURATION_ENGLISH = "1 month" // 30 days!

// LOCK_ADDRESS
const LOCK_ADDRESS = "0xaed749ba8869ee46f1e12853fbb8c66cb88bb80f"



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
  EXPLORER_TX_BASE
};

module.exports = CONSTANTS