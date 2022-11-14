import JobsContainer from "@components/JobsContainer";
import Layout from "@components/Layout";
import Head from "next/head";

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>DevJobs</title>
      </Head>
      <JobsContainer />
    </Layout>
  );
};

export default Home;
