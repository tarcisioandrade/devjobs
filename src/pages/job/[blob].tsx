import { ArrowLeft } from "@components/svg";
import { fetchJobWithBlob } from "@services/fetchJob";
import { Avatar, Badge, Button } from "flowbite-react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Job } from "src/types/Job";
import { useRef, useEffect } from "react";
import DevBadge from "@components/UI/Badge";

type Props = {
  job: Job;
};

const JobPage = ({ job }: Props) => {
  const contentJob = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentJob.current != null) {
      contentJob.current.innerHTML = job.description;
    }
  }, [job.description]);

  console.log(job);
  return (
    <div>
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
            <Button size="lg" className="w-full">
              Candidatar-se a vaga
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center border rounded border-gray-800 self-start p-4 lg:w-[500px] mt-4 flex-[.4]">
          <Avatar img={job.company_avatar} size="xl" />
          <div className="dark:text-gray-300 font-medium mt-2">
            {job.company_name}
          </div>
          <div className="dark:text-gray-400">{job.company_email}</div>
          <div className="bg-slate-800 h-0.5 w-full mt-2"></div>
          <Button size="lg" className="mt-4">
            Candidatar-se a Vaga
          </Button>

          <div className="dark:text-gray-300 mt-4">✅50 Candidatos</div>

          <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
            {job.stacks.map((stack) => (
              <DevBadge key={stack}>{stack}</DevBadge>
            ))}
          </div>
        </div>
      </div>
    </div>
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
