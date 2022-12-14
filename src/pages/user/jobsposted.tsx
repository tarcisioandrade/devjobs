import JobCard from "@components/JobCard";
import Layout from "@components/Layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Job } from "src/types/Job";
import { getSession } from "next-auth/react";
import { fetchJobsPosted } from "@services/fetchJob";

const JobsPosted = ({ jobs }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Vagas Postadas</title>
      </Head>
      <main className="mainContainer">
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

type Props = {
  jobs: Job[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getSession(ctx);
  const jobs = await fetchJobsPosted(session?.user.id as string);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return { props: { jobs } };
};

export default JobsPosted;
