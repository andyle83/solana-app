// Next, React
import { FC, useState, useEffect } from 'react';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

import pkg from '../../../package.json';

export const HomeView: FC = ({ }) => {

  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
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
        </div>
      </div>
    </div>
  );
};