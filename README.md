Simple full stack app based on Solana blockchain

- Tech stack
  + React with JavaScript
  + Anchor framework
  + Solana localhost network

- Install package
  + `Rust` compiler   :  `curl https://sh.rustup.rs -sSf | sh\n`
  + `Solana`tool suit : `sh -c "$(curl -sSfL https://release.solana.com/v1.10.8/install)"`
  + `Anchor` version manager: `cargo install --git https://github.com/project-serum/anchor avm --locked --force
    `
  + `Anchor` framework: 

    ```
    avm install latest
    avm use latest
    ```

- How to run
  + `anchor build` - build smart contract
  + `anchor test` - running JavaScript test script
  + `anchor deploy` - deploy to local, make sure `solana-test-validator` is running
  
We can use `solana logs` command to view logs output

**References**
+ https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291