import JobsContainer from "@components/JobsContainer";
import Layout from "@components/Layout";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { getCookie, deleteCookie } from "cookies-next";
import { User } from "src/types/User";
import { fetchAuthUserToken } from "@services/fetchUser";

const Home = ({ user }: Props) => {
  return (
    <Layout user={user}>
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
  const token = getCookie("token", { req: ctx.req, res: ctx.res });
  let user;

  if (token) {
    try {
      const res = await fetchAuthUserToken(token as string);
      user = res.data;
    } catch (error) {
      deleteCookie("token", { req: ctx.req, res: ctx.res });
    }
  }

  return {
    props: { user: user || null },
  };
};

export default Home;
