/* eslint-disable jest-dom/prefer-in-document */
import { screen, render, logRoles, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobsContainer from "./JobsContainer";
import { server } from "../../mocks/server";
import { rest } from "msw";

export const setup = (tsx: JSX.Element) => ({
  user: userEvent.setup(),
  ...render(tsx),
});

describe("JobsContainer Search and Filters Test", () => {
  it("Search Form", async () => {
    const { user } = setup(<JobsContainer />);
    const searchInput = screen.getByRole("searchbox", { name: "Pesquisar" });
    const buttonSearch = screen.getByRole("button", { name: "Buscar" });

    // check when have one result
    await user.clear(searchInput);
    await user.type(searchInput, "node");
    await user.click(buttonSearch);
    await waitFor(async () =>
      expect(await screen.findAllByTestId("job-card")).toHaveLength(2)
    );

    // check when no have result
    await user.clear(searchInput);
    await user.type(searchInput, "noHaveJobsWithThisName");
    await user.click(buttonSearch);
    expect(
      await screen.findByText(/nenhum resultado encontrado/i)
    ).toBeInTheDocument();

    // check all result when no have search value
    await user.clear(searchInput);
    await user.click(buttonSearch);
    expect(await screen.findAllByTestId("job-card")).toHaveLength(4);
  });

  it("Filters Selects", async () => {
    const { user } = setup(<JobsContainer />);

    // check filter model for display 2 result only
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Modelo de Trabalho" }),
      ["remoto"]
    );
    expect(await screen.findAllByTestId("job-card")).toHaveLength(2);

    // check filter type for display 1 result only
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Tipo da Vaga" }),
      ["junior"]
    );
    expect(await screen.findAllByTestId("job-card")).toHaveLength(1);

    // check filter location for display no results
    await user.selectOptions(screen.getByRole("combobox", { name: "Local" }), [
      "sp",
    ]);
    await user.selectOptions(
      screen.getByRole("combobox", { name: "Modelo de Trabalho" }),
      ["hibrido"]
    );

    expect(
      await screen.findByText(/nenhum resultado encontrado/i)
    ).toBeInTheDocument();
  });

  it("check message error server response", async () => {
    server.resetHandlers(
      rest.get("/jobs", (_req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    setup(<JobsContainer />);
    const messageError = await screen.findByText(
      "Algum erro aconteceu, por favor, tente novamente!"
    );
    expect(messageError).toBeInTheDocument();
  });
});
