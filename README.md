## A Simple fullstack app based on Solana blockchain

### Tech stack
  - Blockchain layer
    + Anchor framework
    + Solana localhost network
  - Frontend layer
    + Next framework with React library (17.xxx)
    + TypeScript language
    + Tailwind CSS framework
    + daisyUI: Tailwind CSS UI component library
    + Immer: Immutable data structure for state management
  - Backend layer - TBD
  - Data layer (Oracle) - TBD

### Prerequisite (required packages)

  - Rust compiler   :  `curl https://sh.rustup.rs -sSf | sh\n`
  - Solana tool suit : `sh -c "$(curl -sSfL https://release.solana.com/v1.10.8/install)"`
  - Anchor version manager: `cargo install --git https://github.com/project-serum/anchor avm --locked --force
`
  - `Anchor` framework: 

      ```
      avm install latest
      avm use latest
      ```

### How to run

  - Solana provides some network (localhost, devnet etc..). I suggest to use `devnet` for development / testing because i found some issue in `localhost` with `fetch`
  - Using command to switch between network:
      + `solana config set --url localhost`
      + `solana config set --url devnet` 
  - Checking current address and balance
      + `solana address`
      + `solana balance [address]` ( if you want to deploy smart contract, make sure you have enough balance)
      + `solana airdrop 1 [address]` to get more solana in your devnet wallet
      + `solana logs`: get logs from network (localhost / devnet)
  - Deployment
      + Getting program id: `solana address -k target/deploy/...-keypair.json`
      + Update `lib.rs` and `Anchor.toml` with program id
      + Switch Fantom wallet to the `devnet` network
      + Run anchor commands to build / test and deploy
        + `anchor build` - build smart contract
        + `anchor test` - running JavaScript test script
        + `anchor deploy` - deploy to local, make sure `solana-test-validator` is running

### Application screenshot

![Home Page Screen with Fantom Wallet Connected](https://github.com/andyle83/solana-app/tree/main/demo_img/1.png)
![Calling RPC to get counter's value](https://github.com/andyle83/solana-app/tree/main/demo_img/2.png)

### References
+ Document
  + [Solana Fullstack development](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291)
  + [Starting with Solana](https://imfeld.dev/writing/starting_with_solana_part01)
  + [Building a blog on Solana with Anchor](https://dev.to/findiglay/building-a-blog-on-solana-2pg8)
  + [Understanding Program Derived Addresses](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
+ Code base
  + [dApp Scaffold](https://github.com/solana-labs/dapp-scaffold)
  + [Solana React Boilerplate](https://github.com/kanav99/solana-boilerplate)
+ Study more
  + [NextJS Advanced](https://nextjs.org/docs/advanced-features/custom-app)
  + [NextJS Foundation](https://nextjs.org/learn/foundations/from-react-to-nextjs)
  + [NextJS Testing](https://nextjs.org/docs/testing)