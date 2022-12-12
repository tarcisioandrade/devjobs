import JobsContainer from "@components/JobsContainer";
import Layout from "@components/Layout";
import Head from "next/head";
import { fetchJob } from "@services/fetchJob";
import { useState } from "react";
import { Job } from "src/types/Job";
import { GetServerSideProps } from "next/types";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { InitialFilterValues } from "@components/JobsContainer/JobsContainer";

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
