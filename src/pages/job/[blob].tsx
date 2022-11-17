import { ArrowLeft } from "@components/svg";
import { fetchJobWithBlob } from "@services/fetchJob";
import { Avatar, Button } from "flowbite-react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Job } from "src/types/Job";
import { useRef, useEffect, useState } from "react";
import DevBadge from "@components/UI/Badge";
import Head from "next/head";
import fetchApplyJob from "@services/fetchApplyJob";
import { useUserContext } from "@contexts/UserContext";
import { useRouter } from "next/router";
import fetchDisapplyJob from "@services/fetchDisapplyJob";
import Layout from "@components/Layout";
import DevButton from "@components/UI/DevButton";

type Props = {
  job: Job;
};

const JobPage = ({ job }: Props) => {
  const contentJob = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { user } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (contentJob.current != null) {
      contentJob.current.innerHTML = job.description;
    }
  }, [job.description]);

  const handleApllyJob = async () => {
    if (!user) router.push("/user/login");
    if (user) {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchApplyJob(job.id, user?.id_user);
        if (res.status != 200) throw new Error("Failed Request");
        router.push("/");
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDisapplyJob = async () => {
    if (user) {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchDisapplyJob(job.id, user?.id_user);
        if (res.status != 204) throw new Error("Failed Request");
        router.push("/");
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };
  const hasApplied =
    job.candidates_status.findIndex(
      (candidates) => candidates.id_user === user?.id_user
    ) != -1;

  const titleHead = `${job.model} ${job.title}`;

  return (
    <Layout>
      <main className="mainContainer">
        <Head>
          <title>{titleHead}</title>
        </Head>
        <Link href="/">
          <Button outline>
            <ArrowLeft />
          </Button>
        </Link>
        <div className="flex gap-4">
          <div className="rounded border border-gray-800 mt-4 p-6 leading-relaxed flex-1">
            <h1 className="text-4xl dark:text-gray-200 font-semibold">
              {job.title}
            </h1>
            <div ref={contentJob} className="JobContainer"></div>
            <div>
              <div className="font-semibold text-2xl dark:text-gray-300 mt-8 mb-4">
                Benefícios
              </div>
              <ul className="dark:text-gray-300">
                {job.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="border rounded border-gray-800 flex flex-col items-center gap-4 p-4 mt-12">
              <div className="text-5xl dark:text-gray-200 font-bold">
                Gostou da Vaga?
              </div>
              <div className="text-xl dark:text-gray-300 font-medium">
                Veja como é facil se candidatar, só apertar no botão abaixo :D
              </div>
              {hasApplied ? (
                <DevButton
                  size="lg"
                  className="w-full"
                  color="failure"
                  onClick={handleDisapplyJob}
                  loading={loading}
                >
                  Cancelar Candidatura
                </DevButton>
              ) : (
                <DevButton
                  size="lg"
                  className="w-full"
                  onClick={handleApllyJob}
                  loading={loading}
                >
                  Candidatar-se a vaga
                </DevButton>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center border rounded border-gray-800 self-start p-4 lg:w-[500px] mt-4 flex-[.4]">
            <Avatar img={job.company_avatar} size="xl" />
            <div className="dark:text-gray-300 font-medium mt-2">
              {job.company_name}
            </div>
            <div className="dark:text-gray-400">{job.company_email}</div>
            <div className="bg-slate-800 h-0.5 w-full mt-2"></div>
            {hasApplied ? (
              <DevButton
                size="lg"
                className="mt-4 w-full"
                color="failure"
                loading={loading}
                onClick={handleDisapplyJob}
              >
                Cancelar Candidatura
              </DevButton>
            ) : (
              <DevButton
                size="lg"
                className="mt-4 w-full"
                onClick={handleApllyJob}
                loading={loading}
              >
                Candidatar-se a Vaga
              </DevButton>
            )}

            <div className="dark:text-gray-300 mt-4">✅{job.candidates_status.length} Candidatos</div>

            <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
              {job.stacks.map((stack) => (
                <DevBadge key={stack}>{stack}</DevBadge>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default JobPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { blob } = ctx.query;
  const job: Job = await fetchJobWithBlob(blob as string);

  return {
    props: { job },
  };
};
