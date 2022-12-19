import Layout from "@components/Layout";
import Head from "next/head";
import JobPostDashboard from "@components/JobPostDashboard/JobPostDashboard";
import { GetServerSideProps } from "next";
import { Job } from "src/types/Job";
import { getSession } from "next-auth/react";
import { fetchJobsPosted } from "@services/fetchJob";
import { SadEmoji } from "@components/svg";

const JobsPosted = ({ jobs }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Vagas Postadas</title>
      </Head>
      <main className="mainContainer">
        <div className="flex flex-col gap-4">
          {jobs.length ? (
            <JobPostDashboard jobs={jobs} />
          ) : (
            <div className="dark:text-gray-600 flex flex-col items-center">
              <h1 className="text-center text-2xl">
                Você não tem vagas postadas.
              </h1>
              <SadEmoji />
            </div>
          )}
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

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/user/login",
      },
    };
  }

  const jobs = await fetchJobsPosted(session?.user.id as string);

  return { props: { jobs } };
};

export default JobsPosted;
