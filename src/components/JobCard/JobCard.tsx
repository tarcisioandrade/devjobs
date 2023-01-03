import Link from "next/link";
import DevBadge from "@components/UI/Badge";
import useFormatter from "@hooks/useFormatter";
import { LinkIcon } from "@components/svg";
import { Avatar } from "flowbite-react";
import { Job } from "../../types/Job";

interface Props {
  job: Job | null;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const JobCard = ({ job, onClick }: Props) => {
  const { formatter, differenceDateAndToday } = useFormatter();

  const jobDateCreated = new Date(job?.createdAt as Date);
  const isNew = differenceDateAndToday(jobDateCreated) <= 3;

  const initialsCompanyName = `${job?.company_name.charAt(
    0
  )}${job?.company_name.charAt(1)}`;

  if (!job) return null;
  return (
    <Link
      key={job.id}
      className="border border-gray-700 bg-gray-800 p-4 rounded drop-shadow-xl hover:opacity-80 transition-opacity block relative"
      data-testid="job-card"
      href={`/job/${job.blob}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {job.company_avatar ? (
          <Avatar
            img={job.company_avatar}
            size="lg"
            rounded
            alt={job.company_name}
            className="hidden md:block"
          />
        ) : (
          <div className="w-[80px] h-[80px] space-x-4  md:items-center md:justify-center bg-gray-600 rounded-full text-slate-300 text-4xl hidden md:flex">
            {initialsCompanyName.toUpperCase()}
          </div>
        )}

        <div className="w-[228px]">
          <div className="flex items-center gap-4">
            <h2 className="text-slate-200 font-semibold sm:whitespace-nowrap">
              {job.title_job}
            </h2>
            {isNew ? (
              <div className="text-xs text-amber-300 shadow animate-bounce">
                NEW
              </div>
            ) : null}
          </div>
          <h3 className="text-slate-400 my-2">{job.company_name}</h3>
          <div className="flex items-center gap-2">
            <span
              color="gray"
              className="text-xs bg-gray-700 text-gray-200 py-[.2rem] px-2 rounded whitespace-nowrap capitalize"
            >
              🏠 {job.model}
            </span>
            <span
              color="gray"
              className="text-xs bg-gray-700 text-gray-200 py-[.2rem] px-2 rounded whitespace-nowrap uppercase"
            >
              📃 {job.contract}
            </span>
            <span
              color="gray"
              className="text-xs bg-gray-700 text-gray-200 py-[.2rem] px-2 rounded whitespace-nowrap capitalize"
            >
              💼 {job.type}
            </span>
            <span
              color="gray"
              className="text-xs bg-gray-700 text-gray-200 py-[.2rem] px-2 rounded whitespace-nowrap capitalize"
            >
              🌎 {job.location}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex gap-3 items-center grow ml-28 capitalize">
          {job.stacks.slice(0, 3).map((stack) => (
            <DevBadge key={stack}>{stack}</DevBadge>
          ))}
        </div>

        <div className="text-slate-400 sm:flex items-center gap-1 absolute top-1 right-1 md:static hidden">
          <LinkIcon />
          {formatter(job.createdAt)}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
