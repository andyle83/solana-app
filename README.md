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

### Foundation

  - Solana project structure
    - `app`: front-end code
    - `programs`: solana program
    - `test`: javascript / typescript test for solana program
    - `migration`: basic deploy script

  - `lib.rs` structure
    - `declare_id!("77iNmGEeh3ks2XSkGCaHeYeePhNGn1Dei2CEMkAssFx9");`: program address. Program execution begin with a transaction submitted to the **cluster**, transaction may include one or more **instructions**.
    - `#[program]`: define program that handle logic via set of **instruction handler** function (RPC handler). For example:
      - `pub fn create(ctx: Context<Create>) -> Result<()> {}`
      - `pub fn increment(ctx: Context<Increment>) -> Result<()>`
    - `Context`: always first param in method, is simple container over transaction instruction
    - `#[derive(Accounts)]`: define **transaction instruction**. For example:
      - `pub struct Create<'info>`
      - `pub struct Initialize {}`
      - `pub struct Increment<'info>`
    - `BaseAccount`: data structure - **Solana Account** that will be passed to transaction instruction. This struct is working as an OS file that storing data between **Transaction**
    - Inside each transaction instruction, we may have three parameters
      - `base_account`: with `#[account(init, payer = user, space = 8 + 8)]`
        - `init`: telling Anchor should create an account responding to `BaseAccount` structure
        - `payer`: indicate which account provide the token (lamports) to pay for newly created account rent. It's `user` account list next!
        - `space`: number of bytes required to store the account's data
      - `user`: account to pay fee for renting fee, it is owner that has authorized the transaction
      - `system_program`: solana system program provides various services, such as creating account, transfer lamports etc.

### How to run

  - Solana provides some network (localhost, devnet, mainnet beta..). I suggest to use `devnet` for development / testing because i found some issue in `localhost` with `fetch`
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

- Home Page Screen with Fantom Wallet Connected

![Home Page Screen with Fantom Wallet Connected](https://raw.githubusercontent.com/andyle83/solana-app/main/demo_img/1.png)

- Calling smart contract to get counter's value

![Calling RPC to get counter's value](https://raw.githubusercontent.com/andyle83/solana-app/main/demo_img/2.png)

### Issues

- Failed to setup Jest in React App (compatible issue ?)

**Note** 

Smart contract address -`Program ID`: `77iNmGEeh3ks2XSkGCaHeYeePhNGn1Dei2CEMkAssFx9`

### References
+ Document
  + [Solana Fullstack development](https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291)
  + [Starting with Solana](https://imfeld.dev/writing/starting_with_solana_part01)
  + [Building a blog on Solana with Anchor](https://dev.to/findiglay/building-a-blog-on-solana-2pg8)
  + [Understanding Program Derived Addresses](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
  + [Solana Programming Model](https://docs.solana.com/developing/programming-model/overview)
  + [Solana Terminologies](https://docs.solana.com/terminology)
  + [Introduce to the Solana blockchain](https://2501babe.github.io/posts/solana101.html)
  + [Learning how to build on Solana](https://www.brianfriel.xyz/learning-how-to-build-on-solana/)
+ Code base
  + [dApp Scaffold](https://github.com/solana-labs/dapp-scaffold)
  + [Solana React Boilerplate](https://github.com/kanav99/solana-boilerplate)
+ Study more
  + [NextJS Advanced](https://nextjs.org/docs/advanced-features/custom-app)
  + [NextJS Foundation](https://nextjs.org/learn/foundations/from-react-to-nextjs)
  + [NextJS Testing](https://nextjs.org/docs/testing)