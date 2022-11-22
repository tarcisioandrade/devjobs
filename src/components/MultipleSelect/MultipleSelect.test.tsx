import { setup } from "@components/JobsContainer/JobsContainer.test";
import { screen, render } from "@testing-library/react";
import React from "react";
import MultipleSelect from ".";

const setState = jest.fn();
const initialState: string[] = ["Node"];

const allOptionsList = ["JavaScript", "Taillwind", "Node", "Docker"];

describe("MultipleSelect", () => {
  beforeEach(() => {
    jest
      .spyOn(React, "useState")
      .mockImplementation(() => setState(initialState));
  });

  it("test render", () => {
    render(
      <MultipleSelect
        allOptionsList={allOptionsList}
        setSelected={setState}
        selected={initialState}
      />
    );
  });

  it("check MultipleSelect appear after click in searchInput and disapear after click again", async () => {
    const { user } = setup(
      <MultipleSelect
        allOptionsList={allOptionsList}
        setSelected={setState}
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

  it("check filter have selected after of click", async () => {
    const { user } = setup(
      <MultipleSelect
        allOptionsList={allOptionsList}
        setSelected={setState}
        selected={initialState}
      />
    );

    const searchInput = screen.getByRole("searchbox", { name: "Search Stack" });

    // click for appear
    await user.click(searchInput);
    await user.clear(searchInput);
    await user.type(searchInput, "Javascript");

    const filterItem = screen.getByText(/javascript/i);
    expect(filterItem).toBeInTheDocument();
    await user.click(filterItem);
    expect(setState).toBeCalledTimes(1);
  });
});
