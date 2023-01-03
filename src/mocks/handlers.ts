import { rest } from "msw";
import data from "./dataForTests.json";

export const handlers = [
  rest.get("http://localhost:3000/api/job", (req, res, ctx) => {
    const { searchParams } = req.url;
    const searchTitle = searchParams.get("searchTitle");
    const type = searchParams.get("type");
    const model = searchParams.get("model");
    const location = searchParams.get("location");
    const contract = searchParams.get("contract");
    const stacksFind = searchParams.get("stacksFind");

    let copyArray = [...data.jobs];

    if (searchTitle) {
      const valueSearched = searchTitle.toLowerCase();
      const filterTitle = data.jobs.filter((job) => {
        const validation1 = job.title_job.toLowerCase().includes(valueSearched);
        const validation2 = job.stacks.some((stack) =>
          stack.toLowerCase().includes(valueSearched)
        );

        return validation1 || validation2;
      });

      copyArray = filterTitle;
    }

    if (model) {
      const valorFiltrado = model.toLowerCase();

      const filterModel = copyArray.filter((job) =>
        job.model.toLowerCase().includes(valorFiltrado)
      );
      copyArray = filterModel;
    }

    if (type) {
      const valorFiltrado = type.toLowerCase();

      const filterType = copyArray.filter((job) =>
        job.type.toLowerCase().includes(valorFiltrado)
      );
      copyArray = filterType;
    }

    if (location) {
      const valorFiltrado = location.toLowerCase();

      const filterLocation = copyArray.filter((job) =>
        job.location.toLowerCase().includes(valorFiltrado)
      );
      copyArray = filterLocation;
    }

    if (contract) {
      const filterContract = copyArray.filter((job) =>
        job.contract.includes(contract)
      );
      copyArray = filterContract;
    }

    if (stacksFind) {
      const filterStacks = copyArray.filter((job) =>
        job.stacks.includes(stacksFind)
      );

      copyArray = filterStacks;
    }

    return res(ctx.json(copyArray));
  }),

  rest.post("http://localhost:3000/api/user/auth", async (req, res, ctx) => {
    const body = await req.json();

    const auth =
      body.email === "email@gmail.com" && body.password === "123456789";

    if (auth) {
      return res(ctx.status(200));
    }
    return res(ctx.status(500));
  }),

  rest.post("http://localhost:3000/api/job", async (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // rest.post("/jobapply", async (req, res, ctx) => {
  //   const body: PostBodyProps = await req.json();

  //   const job = data.jobs.find((job) => job.id === body.id_job);

  //   job?.candidates_status.push({ id_user: body.id_user, status: "applied" });

  //   return res(ctx.json(job));
  // }),

  // rest.delete("/jobdisapply", async (req, res, ctx) => {
  //   const { searchParams } = req.url;
  //   const id_job = searchParams.get("job");
  //   const id_user = searchParams.get("user");

  //   const job = data.jobs.find((job) => job.id === Number(id_job));

  //   const target = job?.candidates_status.findIndex(
  //     (candidates) => candidates.id_user === Number(id_user)
  //   );

  //   job?.candidates_status.splice(target as number, 1);

  //   return res(ctx.status(204));
  // }),

  // rest.post("/jobpost", async (req, res, ctx) => {
  //   const body = await req.json();
  //   if (!body) return res(ctx.status(500));

  //   const job = {
  //     ...body,
  //     id: Math.random() * 10,
  //     createAt: "2022-11-05T11:10:58.590Z",
  //     modifiedAt: "2022-10-10T02:03:58.590Z",
  //     candidates_status: [],
  //   };

  //   data.jobs.push(job);

  //   return res(ctx.json(job));
  // }),

  // rest.get("/userjobsapplied", async (req, res, ctx) => {
  //   const { searchParams } = req.url;
  //   const id_user = searchParams.get("user");

  //   if (id_user) {
  //     const jobsApplied = data.jobs.filter((job) => {
  //       const target = job.candidates_status.some(
  //         (candidate) => candidate.id_user === Number(id_user)
  //       );
  //       return target;
  //     });

  //     return res(ctx.json(jobsApplied));
  //   }

  //   return res(ctx.status(404));
  // }),
];
