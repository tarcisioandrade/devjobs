import JobsContainer from "@components/JobsContainer";
import { setup } from "@components/MultipleSelect/MultipleSelect.test";
import { screen, waitFor } from "@testing-library/react";

describe("Home", () => {
  it("test all filters job and remove filters button", async () => {
    const { user } = setup(<JobsContainer user={null} />);

    // Filter for Search Title
    const searchInput = screen.getByRole("searchbox", {
      name: "Pesquisar",
    });
    const searchButton = screen.getByRole("button", { name: "Buscar" });

    await user.clear(searchInput);
    await user.type(searchInput, "desenvolvedor");
    await user.click(searchButton);

    await waitFor(() =>
      expect(screen.getAllByTestId("job-card")).toHaveLength(4)
    );

    // Filter for Stack
    const stackInput = screen.getByRole("searchbox", { name: "Search Stack" });
    await user.clear(stackInput);
    await user.type(stackInput, "Typescript");
    const typescriptEL = screen.getByTitle("typescript");
    await user.click(typescriptEL);

    await waitFor(() =>
      expect(screen.getAllByTestId("job-card")).toHaveLength(2)
    );

    // Filter for Type
    const typeSelectEL = screen.getByRole("combobox", { name: "Tipo da Vaga" });
    await user.selectOptions(typeSelectEL, ["estagio"]);

    expect(
      await screen.findByText("Nenhum resultado encontrado.")
    ).toBeInTheDocument();
    await user.selectOptions(typeSelectEL, [""]);

    // Filter for model
    const ModelSelectEL = screen.getByRole("combobox", {
      name: "Modelo de Trabalho",
    });
    await user.selectOptions(ModelSelectEL, ["hibrido"]);

    await waitFor(() =>
      // eslint-disable-next-line jest-dom/prefer-in-document
      expect(screen.getAllByTestId("job-card")).toHaveLength(1)
    );
    await user.selectOptions(ModelSelectEL, [""]);

    // Filter for local
    const LocalSelectEL = screen.getByRole("combobox", {
      name: "Local",
    });
    await user.selectOptions(LocalSelectEL, ["AC"]);

    expect(
      await screen.findByText("Nenhum resultado encontrado.")
    ).toBeInTheDocument();

    await user.selectOptions(LocalSelectEL, [""]);

    // Filter for contract
    const ContractSelectEL = screen.getByRole("combobox", {
      name: "Contrato",
    });
    await user.selectOptions(ContractSelectEL, ["pj"]);

    await waitFor(() =>
      // eslint-disable-next-line jest-dom/prefer-in-document
      expect(screen.getAllByTestId("job-card")).toHaveLength(1)
    );

    await user.selectOptions(ContractSelectEL, [""]);

    // Remove filters button
    const removeFiltersButtonEL = screen.getByText("Limpar Filtros");
    await user.click(removeFiltersButtonEL);

    await waitFor(() =>
      expect(screen.getAllByTestId("job-card")).toHaveLength(5)
    );
  });
});
