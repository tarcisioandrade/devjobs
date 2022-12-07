import { NextApiHandler } from "next";
import prisma from "@libs/prismadb";

const handler: NextApiHandler = async (req, res) => {
  const { blob } = req.query;

  if (blob) {
    const job = await prisma.job.findFirst({
      where: {
        blob: blob as string,
      },
    });
    if (job) return res.status(200).json(job);

    return res.status(404).end();
  }

  return res.status(500).end();
};

export default handler;
