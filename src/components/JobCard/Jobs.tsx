import React, { useEffect, useState } from "react";
import { Job } from "../../types/Job";

type Props = {
  jobs: Job[];
};

const Jobs = ({ jobs }: Props) => {
  const allJobs = jobs.map(
    ({ title, id, level, description, location, type, stacks }) => (
      <div key={id} className="border bg-slate-50 p-4 rounded">
        <h2 className="text-2xl">{title}</h2>
        <div className="space-x-2">
          <span>{level}</span>
          <span>{location}</span>
          <span>{type}</span>
        </div>

        <div>{description}</div>

        <div className="space-x-2 font-bold text-purple-800">
          {stacks.map((stack) => (
            <span key={stack}>{stack}</span>
          ))}
        </div>
      </div>
    )
  );

  return <div className="flex mt-10 gap-4">{allJobs}</div>;
};

export default Jobs;
