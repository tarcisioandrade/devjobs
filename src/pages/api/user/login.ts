import { NextApiHandler } from "next";
import prisma from "@libs/prismadb";
import bcrypt from "bcrypt";

const handler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        jobs: true,
      },
    });

    const authUser = bcrypt.compareSync(
      password as string,
      user?.password as string
    );

    if (authUser) {
      const userReturn = {
        id: user?.id,
        user_type: user?.user_type,
        name: user?.name,
        surname: user?.surname,
        email: user?.email,
        avatar: user?.avatar,
        status: user?.status,
        biography: user?.biography,
        jobs: user?.jobs,
        location: user?.location,
        gender: user?.gender,
        stacks: user?.stacks,
        website_url: user?.website_url,
        github_url: user?.github_url,
        linkedin_url: user?.linkedin_url,
        updatedAt: user?.updateAt,
        createdAt: user?.createdAt,
      };
      return res.status(200).json(userReturn);
    }
    return res.status(409).end();
  }

  return res.status(500).end();
};

export default handler;