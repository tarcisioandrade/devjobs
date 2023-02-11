// @ts-nocheck
import { NextApiHandler } from "next";
import prisma from "@libs/prismadb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authUser: NextApiHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Please send token for validate" });

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      async (err, decoded) => {
        // Token Expired error
        if (err?.name === "TokenExpiredError")
          return res.status(498).json({ message: err.message });

        // Others Errors
        if (err)
          return res
            .status(401)
            .json({ message: "Token invalid or expired.", err });

        // Get Data
        const user = await prisma.user.findUnique({
          where: {
            email: decoded.email,
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
    );
  } catch (error) {
    res.status(500).end();
  }
};

const userLogin: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect." });
    }

    const authUser = bcrypt.compareSync(
      password as string,
      user?.password as string
    );

    if (authUser) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
        expiresIn: "24h",
      });
      return res.status(200).json(token);
    }
    return res.status(401).json({ message: "Email or password incorrect." });
  } else {
    res.status(500).end();
  }
};

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      userLogin(req, res);
      break;
    default:
      authUser(req, res);
      break;
  }
};

export default handler;
