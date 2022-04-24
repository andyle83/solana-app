// Next, React
import { FC, useEffect } from 'react';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program, web3, Idl } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

import idl from '../../../solana_app.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

import pkg from '../../../package.json';

export const HomeView: FC = ({ }) => {

  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  const getInitData = async () => {
    const { SystemProgram, Keypair } = web3;
    const baseAccount = Keypair.generate();
    const programID = new PublicKey(idl.metadata.address);
    const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
    // TODO: idl type check issue
    const program = new Program(idl, programID, provider);
    console.log(`RPC with ${programID}`);

    try {
      /* interact with the program via rpc */
      await program.rpc.create({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });

      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log('account: ', account);
    } catch (err) {
      console.log("transaction error: ", err);
    }
  }

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Solana Hackathon<span className='text-sm font-normal align-top text-slate-700'>v{pkg.version}</span>
        </h1>
        <div className="max-w-md mx-auto mockup-code bg-primary p-6 my-3">
          <pre data-prefix="$"><code>anchor deploy</code></pre>
          <pre data-prefix=">" className="text-info"><code>anchor build...</code></pre>
          <pre data-prefix=">" className="text-warning"><code>anchor test...</code></pre>
          <pre data-prefix=">" className="text-success"><code>Deploy success!</code></pre>
        </div>
        <div className="text-center">
          <button className="btn btn-outline btn-secondary">Your Sol: {balance}</button>
          <button className="btn btn-outline btn-secondary" onClick={() => getInitData()}>Get Initial Data</button>
        </div>
      </div>
    </div>
  );
};