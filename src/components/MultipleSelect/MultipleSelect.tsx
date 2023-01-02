import ErrorMessage from "@components/ErrorMessage";
import stacks from "@utils/stacks.json";
import { ArrowDown } from "@components/svg";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

type Props = {
  selected: string[];
  setSelected: (newValue: React.SetStateAction<string[]>) => void;
  helperText?: string;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

const MultipleSelect = ({
  selected,
  setSelected,
  helperText,
  errorMessage,
  setErrorMessage,
}: Props) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [valueForFilter, setValueForFilter] = useState("");
  const [stackToShow, setStackToShow] = useState<string[][]>([]);

  const allOptionStacks = Object.entries(stacks);

  const allOptionsFilteredForValueInInput = allOptionStacks.filter((item) =>
    item[0].toLowerCase().includes(valueForFilter.toLowerCase())
  );

  const optionsFiltered = allOptionsFilteredForValueInInput.filter((item) => {
    const isEqual = selected.findIndex((selec) => item[0] === selec);
    return isEqual === -1;
  });

  const selectBox = useRef<HTMLDivElement>(null);
  const inputSearchFilter = useRef<HTMLInputElement>(null);
  const selectItems = useRef<HTMLDivElement>(null);

  const removeSelect = (option: string[]) => {
    const newValue = selected.filter((item) => item != option[0]);
    const newValueToShow = stackToShow.filter((item) => item[0] != option[0]);
    setOpenSelect(false);
    setSelected(newValue);
    setStackToShow(newValueToShow);
  };

  const addSelect = async (option: string[]) => {
    setSelected((prev) => [...prev, option[0]]);
    setStackToShow((prev) => [...prev, option]);
    setOpenSelect(!openSelect);
    setValueForFilter("");
    inputSearchFilter.current?.focus();
    setErrorMessage("");
  };

  const handleOpenSelect: MouseEventHandler<HTMLDivElement> = (e) => {
    if (
      selectBox.current?.closest("#selectBox") === e.target ||
      selectItems.current?.closest("#selectItems") === e.target ||
      inputSearchFilter.current?.closest("#inputSearchFilter") === e.target
    ) {
      setOpenSelect(!openSelect);
    }
  };

  useEffect(() => {
    const body = document.body;
    const outSideClickCloseSelectBox = (e: MouseEvent) => {
      if (
        e.target != selectBox.current?.closest("#selectBox") &&
        e.target != selectItems.current?.closest("#selectItems") &&
        e.target != inputSearchFilter.current?.closest("#inputSearchFilter")
      ) {
        setOpenSelect(false);
      }
    };

    body.addEventListener("click", outSideClickCloseSelectBox);

    return () => body.removeEventListener("click", outSideClickCloseSelectBox);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueForFilter(e.target.value);
    setOpenSelect(true);
  };

  return (
    <div className="relative">
      <div
        id="selectBox"
        className={` bg-gray-700 p-2.5 text-sm min-h-[42px] rounded-lg border-2  flex items-center ${
          openSelect ? "border-blue-500" : "border-gray-600"
        }`}
        onClick={handleOpenSelect}
        ref={selectBox}
      >
        <div
          ref={selectItems}
          id="selectItems"
          className="flex items-center gap-2 flex-wrap flex-1"
        >
          {stackToShow.map((item) => (
            <div
              key={item[0]}
              className="border border-blueLock  p-1 rounded bg-gray-900  dark:text-blueLock inline-block"
            >
              {item[1]}{" "}
              <button
                className="inline-block mx-1 cursor-pointer"
                onClick={() => removeSelect(item)}
                data-testid={`close-item`}
              >
                X
              </button>
            </div>
          ))}
          <label htmlFor="inputSearchFilter" className="sr-only">
            Search Stack
          </label>
          <input
            type="search"
            id="inputSearchFilter"
            autoComplete="off"
            value={valueForFilter}
            className="bg-transparent border-none focus:ring-0 dark:text-white p-0 flex-1"
            placeholder="Pesquise uma Stack"
            onChange={handleChange}
            ref={inputSearchFilter}
          />
        </div>

        <div className="ml-auto">
          <ArrowDown />
        </div>
      </div>

      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

      <div
        className={`bg-gray-700 rounded mt-1 py-2 text-gray-200 text-sm max-h-60 overflow-y-auto absolute right-0 left-0 ${
          !openSelect ? "hidden" : ""
        }`}
        data-testid="filtersBox"
      >
        {optionsFiltered.map((option, i) => (
          <div
            className="hover:bg-gray-500 pl-2"
            key={i}
            onClick={() => addSelect(option)}
          >
            {option[1]}
          </div>
        ))}
      </div>
      {helperText ? (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default MultipleSelect;
