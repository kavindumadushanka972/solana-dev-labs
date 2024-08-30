'use client';
import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';

const SendSol = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [recieverWallet, setRecieverWallet] = useState<string>('');
  const [sendingAmount, setSendingAmount] = useState<string>('');

  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [txSignature, setTxSignature] = useState<string>('');

  useEffect(() => {
    if (connection && publicKey) {
      fetchBalance();
    } else {
      setWalletBalance(0);
    }
  }, [connection, publicKey]);

  const fetchBalance = async () => {
    try {
      const balanceInLamports = await connection.getBalance(publicKey!);
      const balanceInSol = balanceInLamports / web3.LAMPORTS_PER_SOL;
      setWalletBalance(balanceInSol);
    } catch (error) {
      console.log('ERROR FETCHING BALANCE: ', error);
    }
  };

  const handleSendSol = async () => {
    setIsTransactionPending(true);
    setTxSignature('');
    try {
      const transaction = new web3.Transaction();

      const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: new web3.PublicKey(recieverWallet),
        lamports: Number(sendingAmount) * web3.LAMPORTS_PER_SOL,
      });

      transaction.add(sendSolInstruction);
      const signature = await sendTransaction(transaction, connection);
      setTxSignature(signature);
      console.log('SIGNATURE: ', signature);
    } catch (error) {
      console.log('ERROR SENDING SOL: ', error);
    } finally {
      setIsTransactionPending(false);
    }
  };

  return (
    <div className="container mx-auto pt-10 pb-10">
      <Card className="p-3">
        <CardBody>
          <div className="text-center">
            <h1 className="text-xl">Send Sol</h1>

            <h1 className="font-bold mt-3">
              Wallet Balance: {walletBalance} SOL
            </h1>
          </div>

          <div className="mt-5">
            <p className="text-sm text-start">Sender Wallet Address</p>
            <Input
              placeholder="Sender Wallet Address"
              labelPlacement="outside"
              value={recieverWallet}
              onValueChange={setRecieverWallet}
            />
          </div>

          <div className="mt-5">
            <p className="text-sm text-start">Sending SOL Amount</p>
            <Input
              type="number"
              placeholder="Sending Amount"
              labelPlacement="outside"
              value={sendingAmount}
              onValueChange={setSendingAmount}
              onWheel={(e: any) => e.target.blur()}
              isInvalid={walletBalance < parseFloat(sendingAmount)}
              errorMessage="Input SOL amount is greater than your wallet balance"
            />
          </div>

          <div>
            {txSignature && (
              <div className="mt-5">
                <p className="text-sm text-start">
                  Transaction Signature: {txSignature}
                </p>
              </div>
            )}
          </div>

          <Button
            isDisabled={
              !recieverWallet || !sendingAmount || !connection || !publicKey
            }
            isLoading={isTransactionPending}
            className="mt-5"
            color="primary"
            onClick={handleSendSol}
          >
            Send
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default SendSol;
