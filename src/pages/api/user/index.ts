import { NextApiHandler } from "next";
import prisma from "@libs/prismadb";
import bcrypt from "bcrypt";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handleNewUser: NextApiHandler = async (req, res) => {
  const user = req.body;

  if (user.password) {
    try {
      const hash = bcrypt.hashSync(user.password, 10);
      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          surname: user.surname,
          password: hash,
        },
      });
      return res.status(201).end();
    } catch (error) {
      return res.status(409).json({ message: "E-mail already exist." });
    }
  }
  return res.status(500).end();
};

const handleUpdateUser: NextApiHandler = async (req, res) => {
  const user = req.body;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      user_type: user.user_type,
      name: user.name,
      surname: user.surname,
      avatar: user.avatar,
      location: user.location,
      biography: user.biography,
      gender: user.gender,
      website_url: user.website_url,
      github_url: user.github_url,
      linkedin_url: user.linkedin_url,
      stacks: user.stacks,
    },
  });
  return res.status(200).end();
};

const handleDeleteUser: NextApiHandler = async (req, res) => {
  const id = req.body;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }
  const userDeleted = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (userDeleted) return res.status(200).end();

  return res.status(500).end();
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      handleNewUser(req, res);
      break;
    case "PATCH":
      handleUpdateUser(req, res);
      break;
    case "DELETE":
      handleDeleteUser(req, res);
      break;
  }
};

export default handler;
