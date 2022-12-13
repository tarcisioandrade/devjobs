import JobsContainer from "@components/JobsContainer";
import Layout from "@components/Layout";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { getSession } from "next-auth/react";
import { User } from "src/types/User";

const Home = ({ user }: Props) => {
  return (
    <Layout>
      <Head>
        <title>DevJobs</title>
      </Head>
      <JobsContainer user={user} />
    </Layout>
  );
};

type Props = {
  user: User | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: { user: session?.user || null },
  };
};

export default Home;
