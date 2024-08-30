'use client';
import { Button } from '@nextui-org/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const PROGRAM_ID = new web3.PublicKey(
    process.env.NEXT_PUBLIC_PING_PROGRAM_ID || ''
  );
  const DATA_ACCOUNT_PUBKEY = new web3.PublicKey(
    process.env.NEXT_PUBLIC_PING_DATA_ACCOUNT_PUBKEY || ''
  );

  const onClick = async () => {
    try {
      if (!connection || !publicKey) {
        return;
      }

      const programId = new web3.PublicKey(PROGRAM_ID);
      const programDataAccount = new web3.PublicKey(DATA_ACCOUNT_PUBKEY);
      const transaction = new web3.Transaction();

      const instruction = new web3.TransactionInstruction({
        keys: [
          {
            pubkey: programDataAccount,
            isSigner: false,
            isWritable: true,
          },
        ],
        programId,
      });

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection);
      console.log('signature: ', signature);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-10 text-center">
      <Button onClick={onClick}>Ping!</Button>
    </div>
  );
}
