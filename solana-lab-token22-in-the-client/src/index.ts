import { initializeKeypair } from '@solana-developers/helpers';
import { Cluster, Connection } from '@solana/web3.js';
import createAndMintToken from './create-and-mint-token';
import printTableData from './print-helpers';
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import dotenv from 'dotenv';
dotenv.config();
import {
  TokenInfoForDisplay,
  fetchTokenInfo,
  fetchTokenProgramFromAccount,
} from './fetch-token-info';

const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
const payer = await initializeKeypair(connection);

console.log(`Payer: ${payer.publicKey.toBase58()}`);

const tokenProgramMint = await createAndMintToken(
  connection,
  TOKEN_PROGRAM_ID,
  payer,
  0,
  1000
);
const tokenExtensionProgramMint = await createAndMintToken(
  connection,
  TOKEN_2022_PROGRAM_ID,
  payer,
  0,
  1000
);

const myTokens: TokenInfoForDisplay[] = [];

myTokens.push(
  ...(await fetchTokenInfo(
    connection,
    payer.publicKey,
    TOKEN_PROGRAM_ID,
    'Token Program'
  )),
  ...(await fetchTokenInfo(
    connection,
    payer.publicKey,
    TOKEN_2022_PROGRAM_ID,
    'Token Extensions Program'
  ))
);

printTableData(myTokens);

const tokenProgramTokenProgram = await fetchTokenProgramFromAccount(
  connection,
  tokenProgramMint
);
const tokenExtensionProgramTokenProgram = await fetchTokenProgramFromAccount(
  connection,
  tokenExtensionProgramMint
);

if (!tokenProgramTokenProgram.equals(TOKEN_PROGRAM_ID))
  throw new Error('Token Program mint token program is not correct');
if (!tokenExtensionProgramTokenProgram.equals(TOKEN_2022_PROGRAM_ID))
  throw new Error('Token Extensions Program mint token program is not correct');
