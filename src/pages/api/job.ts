// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { blob } = req.query;
  const targetJob = data.jobs.find((job) => job.blob == blob);

  const response = {
    ...targetJob,
  };

  res.status(200).json(response);
}
