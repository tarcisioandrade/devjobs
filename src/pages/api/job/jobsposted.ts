import prisma from "@libs/prismadb";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { id_user } = req.query;

  if (id_user) {
    const jobsPosted = await prisma.job.findMany({
      where: {
        userId: id_user as string,
      },
    });

    return res.status(200).json(jobsPosted);
  } else {
    return res.status(404).json({ message: "Please, send id_user for get." });
  }
};

export default handler;
