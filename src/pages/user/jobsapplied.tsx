import Layout from "@components/Layout";
import JobCard from "@components/JobCard";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Job } from "src/types/Job";
import { fetchUserJobsApplied } from "@services/fetchUser";
import { getSession } from "next-auth/react";
import { SadEmoji } from "@components/svg";
import { User } from "src/types/User";

type Props = {
  jobs: Job[];
  user: User;
};

const JobsApplied = ({ jobs, user }: Props) => {
  return (
    <Layout user={user}>
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

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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
      user: session.user,
    },
  };
};
export default JobsApplied;
