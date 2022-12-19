import DevBadge from "@components/UI/Badge";
import Head from "next/head";
import fetchApplyJob from "@services/fetchApplyJob";
import fetchDisapplyJob from "@services/fetchDisapplyJob";
import Layout from "@components/Layout";
import DevButton from "@components/UI/DevButton";
import SuccessToast from "@components/SuccessToast/SuccessToast";
import ErrorToast from "@components/ErrorToast";
import Router from "next/router";
import { ArrowLeft } from "@components/svg";
import { fetchJobWithBlob } from "@services/fetchJob";
import { Avatar, Button } from "flowbite-react";
import { GetServerSideProps } from "next";
import { Job } from "src/types/Job";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

type Props = {
  job: Job;
};

const JobPage = ({ job }: Props) => {
  const contentJob = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (contentJob.current != null) {
      contentJob.current.innerHTML = job.description;
    }
  }, [job.description]);

  const handleApllyJob = async () => {
    if (!session?.user.id) router.push("/user/login");
    if (session?.user.id) {
      try {
        setLoading(true);
        await fetchApplyJob(job.id, session?.user.id);
        toast.custom(() => (
          <SuccessToast message="Vaga aplicada com sucesso!" />
        ));
        router.push("/");
      } catch (error) {
        toast.custom(() => (
          <ErrorToast message="Algum erro aconteceu, por favor, tente novamente." />
        ));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDisapplyJob = async () => {
    if (session?.user.id) {
      try {
        setLoading(true);
        await fetchDisapplyJob(job.id, session?.user.id);
        toast.custom(() => (
          <SuccessToast message="Candidatura cancelada com sucesso!" />
        ));
        router.push("/");
      } catch (error) {
        toast.custom(() => (
          <ErrorToast message="Algum erro aconteceu, por favor, tente novamente." />
        ));
      } finally {
        setLoading(false);
      }
    }
  };
  const hasApplied = job.candidates.includes(session?.user.id as string);

  const titleHead = `${
    job.model.charAt(0).toUpperCase() + job.model.slice(1)
  } ${job.title_job}`;

  return (
    <Layout>
      <main className="mainContainer">
        <Head>
          <title>{titleHead}</title>
        </Head>
        <Button outline onClick={() => Router.back()}>
          <ArrowLeft />
        </Button>
        <div className="flex gap-4">
          <div className="rounded border border-gray-800 mt-4 p-6 leading-relaxed flex-1">
            <h1 className="text-4xl dark:text-gray-200 font-semibold">
              {job.title_job}
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

            <div>
              <div className="font-semibold text-2xl dark:text-gray-300 mt-8 mb-4">
                Faixa Salarial
              </div>
              <p className="dark:text-gray-300">{job.salary_range}</p>
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
                  loading={+loading}
                >
                  Cancelar Candidatura
                </DevButton>
              ) : (
                <DevButton
                  size="lg"
                  className="w-full"
                  onClick={handleApllyJob}
                  loading={+loading}
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
                loading={+loading}
                onClick={handleDisapplyJob}
              >
                Cancelar Candidatura
              </DevButton>
            ) : (
              <DevButton
                size="lg"
                className="mt-4 w-full"
                onClick={handleApllyJob}
                loading={+loading}
              >
                Candidatar-se a Vaga
              </DevButton>
            )}

            <div className="dark:text-gray-300 mt-4 text-center">
              {job.candidates.length === 0
                ? "Ainda não há candidatos, seja o primeiro!"
                : job.candidates.length > 1
                ? `✅ ${job.candidates.length} Candidatos`
                : `✅ ${job.candidates.length} Candidato`}
            </div>

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
