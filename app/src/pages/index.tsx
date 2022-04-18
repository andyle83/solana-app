import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Application</title>
        <meta
          name="description"
          content="Solana Application"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;