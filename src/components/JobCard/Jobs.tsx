import { HouseIcon, LinkIcon, PaperIcon, UserIcon } from "@components/svg";
import { Avatar, Badge } from "flowbite-react";
import React from "react";
import { Job } from "../../types/Job";
import { formatDistanceStrict } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import Link from "next/link";

type Props = {
  jobs: Job[];
};

const Jobs = ({ jobs }: Props) => {
  const formatter = (date: Date) =>
    formatDistanceStrict(new Date(date), new Date(), {
      locale: ptBR,
    });

  const allJobs = jobs.map((job) => (
    <Link
      key={job.id}
      className="border border-gray-700 bg-gray-800 p-4 rounded drop-shadow-xl"
      data-testid="job-card"
      href={`job/${job.blob}`}
    >
      <div className="flex items-center gap-4">
        <Avatar
          img={job.company_avatar}
          size="lg"
          rounded
          alt={job.company_name}
        />
        <div className="w-[228px]">
          <h2 className="text-slate-200 font-semibold">{job.title}</h2>
          {/* h3 = company name */}
          <h3 className="text-slate-400 my-2">{job.company_name}</h3>
          <div className="flex items-center gap-2">
            <Badge color="gray" icon={HouseIcon}>
              {job.model}
            </Badge>
            <Badge color="gray" icon={UserIcon}>
              {job.type}
            </Badge>
            <Badge color="gray" icon={PaperIcon}>
              {job.contract}
            </Badge>
          </div>
        </div>

        <div className="flex gap-3 items-center grow ml-28">
          {job.stacks.slice(0, 3).map((stack) => (
            <span
              key={stack}
              className="text-blueLock text-xs font-medium p-2 border rounded border-current"
            >
              {stack}
            </span>
          ))}
        </div>

        <div className="text-slate-400 flex items-center">
          <LinkIcon />
          {formatter(job.createAt)}
        </div>
      </div>
    </Link>
  ));

  return <div className="flex flex-col mt-10 gap-4">{allJobs}</div>;
};

export default Jobs;
