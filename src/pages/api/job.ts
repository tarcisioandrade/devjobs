// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { blob } = req.query;
  const targetJob = data.jobs.find((job) => job.blob == blob);

  const infoCompany = data.companies.find(
    (companie) => companie.id_company === targetJob?.id_company
  );

  const response = {
    ...targetJob,
    company_name: infoCompany?.company_title,
    company_avatar: infoCompany?.avatar,
    company_email: infoCompany?.email,
  };

  res.status(200).json(response);
}
