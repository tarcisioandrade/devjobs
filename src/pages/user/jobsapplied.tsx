import Layout from "@components/Layout";
import fetchUserJobsApplied from "@services/fetchUserJobsApplied";
import { GetServerSideProps } from "next";
import { Job } from "src/types/Job";
import JobCard from "@components/JobCard";
import Head from "next/head";

type Props = {
  jobs: Job[];
};

const JobsApplied = ({ jobs }: Props) => {
  return (
    <Layout>
      <Head>
        <title>DevJobs | Vagas Aplicadas</title>
      </Head>
      <main className="mainContainer">
        <div className="flex gap-4 flex-col">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const jobs: Job[] = await fetchUserJobsApplied(59);

  return {
    props: {
      jobs,
    },
  };
};
export default JobsApplied;
