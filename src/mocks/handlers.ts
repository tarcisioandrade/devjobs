import { rest } from "msw";
import data from "../../data.json";

export const handlers = [
  rest.get("/jobs", (_req, res, ctx) => {
    return res(ctx.json(data.jobs));
  }),

  rest.get("/login", (_req, res, ctx) => {
    return res(ctx.json(data.users[0]));
  }),
];
