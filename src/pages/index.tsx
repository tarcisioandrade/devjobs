import JobsContainer from "@components/JobsContainer";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>DevJobs</title>
      </Head>
      <JobsContainer />
    </>
  );
};

export default Home;
