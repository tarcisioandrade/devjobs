import type { NextApiHandler } from "next";
import prisma from "@libs/prismadb";

const handler: NextApiHandler = async (req, res) => {
  const { id_user } = req.query;

  const allJobs = await prisma.job.findMany();

  if (!allJobs) {
    return res.status(500).end();
  }

  const jobsApplied = allJobs.filter((job) =>
    job.candidates.includes(id_user as string)
  );

  if (jobsApplied.length) {
    return res.status(200).json(jobsApplied);
  } else {
    return res.status(200).json({ message: "User not Found." });
  }
};

export default handler;
