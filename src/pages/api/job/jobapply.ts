import type { NextApiHandler } from "next";
import prisma from "@libs/prismadb";

const handler: NextApiHandler = async (req, res) => {
  const { id_user, id_job } = req.body;

  const job = await prisma.job.findUnique({
    where: {
      id: id_job as string,
    },
  });

  if (job) {
    if (job.candidates.includes(id_user)) {
      return res.status(409).json({ message: "User has applied." });
    }

    job.candidates.push(id_user as string);

    await prisma.job.update({
      where: {
        id: id_job as string,
      },
      data: {
        candidates: job.candidates,
      },
    });

    return res.status(200).json({ message: "Job Applied." });
  }

  return res.status(500).end();
};

export default handler;
