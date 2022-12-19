import { NextApiHandler } from "next";
import prisma from "@libs/prismadb";
import bcrypt from "bcrypt";

const handleGetUser: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if (id) {
    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        id: true,
        user_type: true,
        id_devjobs: true,
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
        updatedAt: true,
        fluents: true,
        createdAt: true,
      },
    });
    return res.status(200).json(user);
  }
  return res.status(500).end();
};

const handleNewUser: NextApiHandler = async (req, res) => {
  const user = req.body;
  const numberRadom = Math.floor(Math.random() * 10241);

  if (user.password) {
    try {
      const hash = bcrypt.hashSync(user.password, 10);
      await prisma.user.create({
        data: {
          id_devjobs: `@${user.name}${numberRadom}`,
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

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      user_type: user.user_type,
      id_devjobs: user.id_devjobs,
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
      fluents: user.fluents,
    },
  });
  return res.status(200).end();
};

const handleDeleteUser: NextApiHandler = async (req, res) => {
  const id = req.body;

  if (id) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.status(200).end();
  }

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
    default:
      handleGetUser(req, res);
  }
};

export default handler;
