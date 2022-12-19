import { Job } from "src/types/Job";
import JobCard from "@components/JobCard";
import Dashboard from "./Dashboard";

type Props = {
  jobs: Job[];
};

const JobPostDashboard = ({ jobs }: Props) => {
  const handleDashboard = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.currentTarget.nextElementSibling?.classList.toggle("hidden");
  };

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <div key={job.id}>
          <JobCard job={job} onClick={handleDashboard} />
          <Dashboard candidates={job.candidates} id={job.id}/>
        </div>
      ))}
    </div>
  );
};

export default JobPostDashboard;
