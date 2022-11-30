import { NextApiHandler } from "next";
import prisma from "@libs/prismadb";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if (id) {
    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        user_type: true,
        email: true,
        name: true,
        surname: true,
        avatar: true,
        biography: true,
        gender: true,
        jobs: true,
        location: true,
        stacks: true,
        employee: true,
        github_url: true,
        linkedin_url: true,
        website_url: true,
        updateAt: true,
        createdAt: true,
      },
    });
    return res.status(200).json(user);
  }
  return res.status(500).end();
};

export default handler;
