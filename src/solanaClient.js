import * as solanaWeb3 from '@solana/web3.js';

import {Account, Connection} from '@solana/web3.js';

let SOLANA_DEVNET_URL = 'https://api.devnet.solana.com';

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(): Promise<void> {
  let connection = new solanaWeb3.Connection(SOLANA_DEVNET_URL, 'confirmed');
  const version = await connection.getVersion();
  console.log('Connection to cluster established:', version);
  return {connection, version};
}

/**
 * Generate public/private key pair to use in an Account.
 */
export function generateKeyPair() {
  const keypair = solanaWeb3.Keypair.generate();
  console.log('KeyPair successfully generated');
  return {publicKey: keypair?.publicKey, privateKey: keypair?.secretKey};
}

/**
 * Airdrop lamports to an account.
 */
export async function fundAccountWithLamports(
  connection: solanaWeb3.Connection,
  publicKey: solanaWeb3.PublicKey,
  lamports = 10000000,
): Promise<Account> {
  const hash = await connection.requestAirdrop(publicKey, lamports);
  await connection.confirmTransaction(hash);
  let accountBalance = (await connection.getBalance(publicKey));
  console.log(`Account funded with ${accountBalance}`);
}

/**
 * Fetch information associated with an account.
 */
export async function getAccountInfo(connection: Connection, programId: string) {
  const publicKey = new solanaWeb3.PublicKey(programId);
  const accountInfo = await connection.getAccountInfo(publicKey);
  return accountInfo;
}

/**
 * Transfer lamports between accounts.
 */
export async function transfer(
  connection: solanaWeb3.Connection,
  fromPublicKeyString: string,
  fromPrivateKeyString: string,
  toPublicKeyString: string,
  lamports) {
  const fromPublicKey = solanaWeb3.PublicKey(fromPublicKeyString);
  const fromPrivateKey = Uint8Array.from(fromPrivateKey);
  const toPublicKey = solanaWeb3.PublicKey(toPublicKeyString);
  const instructions = solanaWeb3.SystemProgram.transfer({
    fromPublicKey,
    toPublicKeyString,
    lamports,
  });
  const signers = [
    {
      publicKey: fromPublicKey,
      fromPrivateKey,
    },
  ];
  const transaction = new solanaWeb3.Transaction().add(instructions);
  const hash = await connection.sendTransaction(transaction, signers);
  return hash;
}
