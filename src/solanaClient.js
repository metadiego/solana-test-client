import * as solanaWeb3 from '@solana/web3.js';

import {Account, Connection} from '@solana/web3.js';

let SOLANA_DEVNET_URL = 'https://api.devnet.solana.com';

const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(): Promise<void> {
  let connection = new solanaWeb3.Connection(SOLANA_DEVNET_URL, 'singleGossip');
  const version = await connection.getVersion();
  console.log('Connection to cluster established:', version);
  return {connection, version};
}

export async function generateKeyPair() {
  const keypair = solanaWeb3.Keypair.generate();
  console.log('KeyPair successfully generated');
  return {publicKey: keypair?.publicKey, privateKey: keypair?.secretKey};
}

export async function fundAccountWithLamports(
  connection: Connection,
  publicKey,
  lamports = 10000000,
): Promise<Account> {

  let retries = 10;
  await connection.requestAirdrop(publicKey, lamports);
  for (;;) {
    await delay(5000);
    let accountBalance = (await connection.getBalance(publicKey))
    if (lamports <= accountBalance) {
      console.log(`Account funded with ${accountBalance}`);
      return accountBalance;
    }
    if (--retries <= 0) {
      break;
    }
    console.log(`Airdrop retry ${retries}`);
  }
  throw new Error(`Airdrop of ${lamports} failed`);
}

export async function checkProgramDeployment(programId) {
  const connection = new solanaWeb3.Connection(SOLANA_DEVNET_URL, 'confirmed');
  const publicKey = new solanaWeb3.PublicKey(programId);
  const programInfo = await connection.getAccountInfo(publicKey);
  console.log(`Program successfully deployed to Solana Dev Net:`);
  console.log(programInfo);
}
