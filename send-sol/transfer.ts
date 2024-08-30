import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';
import 'dotenv/config';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment('SECRET_KEY');
console.log(`suppliedToPubkey: ${suppliedToPubkey}`);
const toPubkey = new PublicKey(suppliedToPubkey);

/**
 * Commitment levels determine how finalized the data you’re querying needs to be. Here are the main commitment levels:

	•	“processed”: The node has processed the transaction but hasn’t confirmed it with the cluster yet.
	•	“confirmed”: The transaction has been confirmed by the cluster but might not be fully finalized.
	•	“finalized”: The transaction is fully finalized and part of the immutable ledger.

So, "confirmed" means you’re establishing a connection that prioritizes querying data or transactions 
that have been confirmed by the cluster but aren’t necessarily fully finalized. 
This level strikes a balance between data freshness and reliability.
 */
const connection = new Connection(clusterApiUrl('devnet'), 'processed');

console.log(
  `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);
