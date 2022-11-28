import { NextApiHandler } from "next";
import data from "../../../../data.json";
import prisma from "@libs/prismadb";
import bcrypt from "bcrypt";

const handleGetUser: NextApiHandler = (req, res) => {
  const user = data.users.find((user) => user.id_user == 59);

  res.status(200).json(user);
};

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
      return res.status(409).json({message: "E-mail already exist."});
    }
  }
  return res.status(500).end();
};

const handleUpdateUser: NextApiHandler = (req, res) => {};

const handleDeleteUser: NextApiHandler = (req, res) => {};

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      handleGetUser(req, res);
      break;
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
