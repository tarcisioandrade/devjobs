import { rest } from "msw";
import data from "../../data.json";

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
        const validation1 = job.title.toLowerCase().includes(valueSearched);
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

    const infoCompany = copyArray.map((job) => {
      const companyInfo = data.companies.find(
        (company) => company.id_company == job.id_company
      );
      return {
        ...job,
        company_avatar: companyInfo?.avatar,
        company_name: companyInfo?.company_title
      };
    });

    return res(ctx.json(infoCompany));
  }),

  rest.get("/login", (_req, res, ctx) => {
    return res(ctx.json(data.users[0]));
  }),
];
