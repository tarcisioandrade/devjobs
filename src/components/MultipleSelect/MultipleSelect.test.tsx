import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import MultipleSelect from ".";

const setSelectedFN = jest.fn();
const initialState: string[] = ["Node"];

export const setup = (tsx: JSX.Element) => ({
  user: userEvent.setup(),
  ...render(tsx),
});

describe("MultipleSelect", () => {
  test("test render", () => {
    render(
      <MultipleSelect
        setErrorMessage={jest.fn()}
        errorMessage="Este Campo é Obrigatório"
        setSelected={setSelectedFN}
        selected={initialState}
      />
    );
  });

  test("check MultipleSelect appear after click in searchInput and disapear after click again", async () => {
    const { user } = setup(
      <MultipleSelect
        setErrorMessage={jest.fn()}
        errorMessage="Este Campo é Obrigatório"
        setSelected={setSelectedFN}
        selected={initialState}
      />
    );
    const searchInput = screen.getByRole("searchbox", { name: "Search Stack" });

    // click for appear
    await user.click(searchInput);
    expect(await screen.findByTestId("filtersBox")).toBeInTheDocument();

    // click again for disappear
    await user.click(searchInput);
    expect(await screen.findByTestId("filtersBox")).toHaveClass("hidden");
  });

  test("check filter have selected after of click and remove filter after click in button close.", async () => {
    const { user } = setup(
      <MultipleSelect
        setErrorMessage={jest.fn()}
        errorMessage="Este Campo é Obrigatório"
        setSelected={setSelectedFN}
        selected={initialState}
      />
    );

    const searchInput = screen.getByRole("searchbox", { name: "Search Stack" });

    // Filter item
    await user.click(searchInput);
    await user.clear(searchInput);
    await user.type(searchInput, "Javascript");

    const filterItem = screen.getByText(/javascript/i);
    expect(filterItem).toBeInTheDocument();
    await user.click(filterItem);
    expect(setSelectedFN).toBeCalledTimes(1);

    // Remove filter
    const buttonClose = screen.getByTestId("close-item");
    await user.click(buttonClose);
    expect(buttonClose).not.toBeInTheDocument();
  });
});
