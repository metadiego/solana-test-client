import * as solanaWeb3 from '@solana/web3.js';


let SOLANA_DEVNET_URL = 'https://api.devnet.solana.com';
  // let connection:Connection;

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(): Promise<void> {
  let connection = new solanaWeb3.Connection(SOLANA_DEVNET_URL, 'singleGossip');
  const version = await connection.getVersion();
  console.log('Connection to cluster established:', version);
  return connection;
}
