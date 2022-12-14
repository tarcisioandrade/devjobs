import type { NextApiHandler } from "next";
import prisma from "@libs/prismadb";

const handleGetAllJob: NextApiHandler = async (req, res) => {
  const {
    id,
    page,
    type,
    searchTitle,
    model,
    location,
    contract,
    stacksFind,
    offset,
  } = req.query;

  let take = parseInt(offset as string) || 6;
  let skip = 0;

  if (page) {
    skip = (parseInt(page as string) - 1) * take;
  }

  // User is not logged in
  if (!id) {
    const allJobsDisponible = await prisma.job.findMany({
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
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

    if (allJobsDisponible.length <= 0) {
      return res.status(204).end();
    }

    return res.status(200).json(allJobsDisponible);
  }

  // User is logged in
  if (id) {
    const allJobsDisponible = await prisma.job.findMany({
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: [
          {
            userId: id as string,
          },
        ],
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

    if (allJobsDisponible.length <= 0) {
      return res.status(204).end();
    }

    const jobsNoApplied = allJobsDisponible.filter(
      (job) => !job.candidates.includes(id as string)
    );

    return res.status(200).json(jobsNoApplied);
  }

  return res.status(500).end();
};

const handleNewJob: NextApiHandler = async (req, res) => {
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

const handleUpdateJob: NextApiHandler = async (req, res) => {};

const handleDeleteJob: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if (id) {
    await prisma.job.delete({
      where: {
        id: id as string,
      },
    });

    return res.status(200).json({ message: "Job has successfuly deleted." });
  }

  return res.status(500).end();
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
