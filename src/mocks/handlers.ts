import { rest } from "msw";
import { Job, JobPost } from "src/types/Job";
import data from "../../data.json";

type PostBodyProps = {
  id_job: number;
  id_user: number;
};

export const handlers = [
  rest.get("/jobs", (req, res, ctx) => {
    const { searchParams } = req.url;
    const search = searchParams.get("search");
    const type = searchParams.get("tipo");
    const model = searchParams.get("model");
    const location = searchParams.get("local");

    let copyArray = [...data.jobs];

    if (search) {
      const valueSearched = search.toLowerCase();
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

    return res(ctx.json(copyArray));
  }),

  rest.get("/login", (_req, res, ctx) => {
    return res(ctx.json(data.users[0]));
  }),

  rest.post("/jobapply", async (req, res, ctx) => {
    const body: PostBodyProps = await req.json();

    const job = data.jobs.find((job) => job.id === body.id_job);

    job?.candidates_status.push({ id_user: body.id_user, status: "applied" });

    return res(ctx.json(job));
  }),

  rest.delete("/jobdisapply", async (req, res, ctx) => {
    const { searchParams } = req.url;
    const id_job = searchParams.get("job");
    const id_user = searchParams.get("user");

    const job = data.jobs.find((job) => job.id === Number(id_job));

    const target = job?.candidates_status.findIndex(
      (candidates) => candidates.id_user === Number(id_user)
    );

    job?.candidates_status.splice(target as number, 1);

    return res(ctx.status(204));
  }),

  rest.post("/jobpost", async (req, res, ctx) => {
    const body = await req.json();
    if (!body) return res(ctx.status(500));

    const job = {
      ...body,
      id: Math.random() * 10,
      createAt: "2022-11-05T11:10:58.590Z",
      modifiedAt: "2022-10-10T02:03:58.590Z",
      candidates_status: [],
    };

    data.jobs.push(job);

    return res(ctx.json(job));
  }),
];
