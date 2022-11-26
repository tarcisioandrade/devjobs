import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.query;

  if (user) {
    const jobsApplied = data.jobs.filter((job) => {
      const target = job.candidates_status.some(
        (candidate) => candidate.id_user === Number(user)
      );
      return target;
    });

    return res.json(jobsApplied);
  }

  res.status(500);
}
