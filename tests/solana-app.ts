import base = Mocha.reporters.base;

const assert = require("assert");
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";
import { SolanaApp } from "../target/types/solana_app";

describe("solana-app", () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaApp as Program<SolanaApp>;
  const baseAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your init transaction signature: ", tx);
  });

  it("Create counter", async() => {
    const tx = await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [baseAccount],
    });
    console.log("You create transaction signature: ", tx);

    /* Fetch the account and check the value of count */
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Initial counter: ', account.count.toString())
    assert.ok(account.count.toString() == "2022");
  })

  it("Update counter with one unit", async() => {
    const tx = await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey
      }
    });
    console.log("Your update transaction signature: ", tx);

    /* Fetch the account and check the value of count */
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Update counter: ', account.count.toString())
    assert.ok(account.count.toString() == "2023");
  })

});
