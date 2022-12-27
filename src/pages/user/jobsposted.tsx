import Layout from "@components/Layout";
import Head from "next/head";
import JobPostDashboard from "@components/JobPostDashboard/JobPostDashboard";
import { GetServerSideProps } from "next";
import { Job } from "src/types/Job";
import { getSession } from "next-auth/react";
import { fetchJobsPosted } from "@services/fetchJob";
import { SadEmoji } from "@components/svg";
import { User } from "src/types/User";

const JobsPosted = ({ jobs, user }: Props) => {
  return (
    <Layout user={user}>
      <Head>
        <title>Vagas Postadas</title>
      </Head>
      <main className="mainContainer">
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
      </main>
    </Layout>
  );
};

type Props = {
  jobs: Job[];
  user: User;
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

  return { props: { jobs, user: session.user } };
};

export default JobsPosted;
