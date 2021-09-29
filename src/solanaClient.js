import * as solanaWeb3 from '@solana/web3.js';

import {Account, Connection} from '@solana/web3.js';

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(url): Promise<void> {
  console.log(url);
  let connection = new solanaWeb3.Connection(url, 'confirmed');
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
  return accountBalance;
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
  fromPrivateKey: Uint8Array,
  toPublicKeyString: string,
  lamports) {
  const fromPublicKey = new solanaWeb3.PublicKey(fromPublicKeyString);
  const toPublicKey = new solanaWeb3.PublicKey(toPublicKeyString);
  const instructions = solanaWeb3.SystemProgram.transfer({
    fromPublicKey,
    toPublicKey,
    lamports,
  });
  const signers = [
    {
      publicKey: fromPublicKey,
      fromPrivateKey,
    },
  ];
  const transaction = new solanaWeb3.Transaction().add(instructions);
  const hash = await solanaWeb3.sendAndConfirmTransaction(transaction, signers);
  return hash;
}
