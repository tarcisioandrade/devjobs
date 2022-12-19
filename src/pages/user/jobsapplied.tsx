import Layout from "@components/Layout";
import fetchUserJobsApplied from "@services/fetchUserJobsApplied";
import { GetServerSideProps } from "next";
import { Job } from "src/types/Job";
import JobCard from "@components/JobCard";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { SadEmoji } from "@components/svg";

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
          {jobs.length ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="dark:text-gray-600 flex flex-col items-center">
              <h1 className="text-center text-2xl">
                Você ainda não aplicou em nenhuma vaga.
              </h1>
              <SadEmoji />
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: "/user/login",
        permanent: false,
      },
    };

  const jobs: Job[] = await fetchUserJobsApplied(session?.user.id as string);

  return {
    props: {
      jobs: jobs || null,
    },
  };
};
export default JobsApplied;
