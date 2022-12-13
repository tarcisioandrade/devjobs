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
    if (!job.candidates.includes(id_user)) {
      return res.status(404).json({ message: "User not Found." });
    }

    const candidatesUpdated = job.candidates.filter(
      (id) => id != (id_user as string)
    );

    await prisma.job.update({
      where: {
        id: id_job as string,
      },
      data: {
        candidates: candidatesUpdated,
      },
    });

    return res.status(200).json({ message: "Job Disapplied." });
  }

  return res.status(500).end();
};

export default handler;
