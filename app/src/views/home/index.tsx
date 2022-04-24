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

  const initData = async () => {
    const { SystemProgram, Keypair } = web3;
    const baseAccount = Keypair.generate();
    const programID = new PublicKey(idl.metadata.address);
    const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
    // TODO: idl type check issue
    // @ts-ignore
    const program = new Program(idl, programID, provider);
    console.log(`rpc with program id: ${programID}`);

    try {
      // noinspection JSDeprecatedSymbols
      const tx = await program.rpc.create({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });
      console.log("transaction signature: ", tx);

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
        <div className="stats shadow text-center">
          <div className="stat">
            <div className="stat-title">Current balance</div>
            <div className="stat-value">{balance} (sol)</div>
            <div className="stat-desc">You pay if you click on below button</div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-outline btn-secondary" onClick={initData}>RPC Invoke</button>
        </div>
      </div>
    </div>
  );
};