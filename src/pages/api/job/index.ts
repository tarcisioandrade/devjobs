import type { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@libs/prismadb";

const handleGetAllJob: NextApiHandler = async (req, res) => {
  const { id, page, type, searchTitle, model, location, contract, stacksFind } =
    req.query;

  let take = 8;
  let skip = 0;
  let allJobs = [];

  if (page) {
    skip = (parseInt(page as string) - 1) * take;
  }

  // User is not logged in
  if (!id) {
    const allJobsDisponible = await prisma.job.findMany({
      take,
      skip,
      where: {
        type: type as string,
        model: model as string,
        location: location as string,
        contract: contract as string,
        title_job: {
          contains: searchTitle as string,
          mode: "insensitive",
        },
        stacks: {
          hasEvery: stacksFind || [],
        },
      },
    });

    allJobs = allJobsDisponible;

    if (allJobs.length <= 0) {
      return res.status(204).end();
    }

    return res.status(200).json(allJobs);
  }

  // User is logged in
  if (id) {
    const allJobsDisponible = await prisma.job.findMany({
      take,
      skip,
      where: {
        NOT: {
          userId: id as string,
        },
        type: type as string,
        model: model as string,
        location: location as string,
        contract: contract as string,
        title_job: {
          contains: searchTitle as string,
          mode: "insensitive",
        },
        stacks: {
          hasEvery: stacksFind || [],
        },
      },
    });

    allJobs = allJobsDisponible;

    if (allJobs.length <= 0) {
      return res.status(204).end();
    }

    return res.status(200).json(allJobs);
  }

  return res.status(500).end();
};

const handleNewJob: NextApiHandler = async (req, res) => {
  const session = unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }
  const job = req.body;
  try {
    await prisma.job.create({
      data: {
        userId: job.id_user,
        title_job: job.title_job,
        company_name: job.company_name,
        company_avatar: job.company_avatar,
        company_email: job.company_email,
        description: job.description,
        location: job.location,
        contract: job.contract,
        model: job.model,
        salary_range: job.salary_range,
        stacks: job.stacks,
        benefits: job.benefits,
        blob: job.blob,
        type: job.type,
      },
    });
    return res.status(201).json({ message: "Job has successfuly created." });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleUpdateJob: NextApiHandler = async (req, res) => {
  const session = unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }
};

const handleDeleteJob: NextApiHandler = async (req, res) => {
  const session = unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "You must be logged in." });
  }
};

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      handleGetAllJob(req, res);
      break;
    case "POST":
      handleNewJob(req, res);
      break;
    case "PATCH":
      handleUpdateJob(req, res);
      break;
    case "DELETE":
      handleDeleteJob(req, res);
      break;
  }
};

export default handler;
