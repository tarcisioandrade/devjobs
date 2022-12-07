import { ArrowDown } from "@components/svg";
import { useState, useRef, useEffect, MouseEventHandler } from "react";
import stacks from "@utils/stacks.json";

type Props = {
  selectedStacks: string[];
  setSelectedStacks: (newValue: React.SetStateAction<string[]>) => void;
  setStackToShow: (newValue: React.SetStateAction<string[][]>) => void;
};

const StacksBoxWithInput = ({
  setSelectedStacks,
  selectedStacks,
  setStackToShow,
}: Props) => {
  const [openSelect, setOpenSelect] = useState(false);
  const [valueForFilter, setValueForFilter] = useState("");

  const selectBox = useRef<HTMLDivElement>(null);
  const inputSearchFilter = useRef<HTMLInputElement>(null);

  const stacksEntries = Object.entries(stacks);

  const allOptionsFilteredForValueInInput = stacksEntries.filter((item) =>
    item[0].toLowerCase().includes(valueForFilter.toLowerCase())
  );

  const optionsFiltered = allOptionsFilteredForValueInInput.filter((item) => {
    const isEqual = selectedStacks.findIndex((selec) => item[0] === selec);

    return isEqual === -1;
  });

  const addSelect = async (option: string[]) => {
    setSelectedStacks((prev) => [...prev, option[0]]);
    setStackToShow((prev) => [...prev, option]);
    setOpenSelect(!openSelect);
    setValueForFilter("");
    inputSearchFilter.current?.focus();
  };

  const handleOpenSelect: MouseEventHandler<HTMLDivElement> = (e) => {
    if (
      selectBox.current?.closest("#selectBox") === e.target ||
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
        className={` bg-gray-700 p-2.5 text-sm max-h-[42px] rounded-lg border-2  flex items-center ${
          openSelect ? "border-blue-500" : "border-gray-600"
        }`}
        onClick={handleOpenSelect}
        ref={selectBox}
      >
        <div>
          <label htmlFor="inputSearchFilter" className="sr-only">
            Search Stack
          </label>
          <input
            type="search"
            id="inputSearchFilter"
            autoComplete="off"
            value={valueForFilter}
            className="bg-transparent border-none focus:ring-0 dark:text-white p-0 placeholder:text-white w-full text-sm"
            placeholder="Stack"
            onChange={handleChange}
            ref={inputSearchFilter}
          />
        </div>

        <div className="">
          <ArrowDown />
        </div>
      </div>

      <div
        className={`bg-gray-700 rounded mt-1 py-2 text-gray-200 text-sm max-h-60 overflow-y-auto absolute right-0 left-0 z-10 ${
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
    </div>
  );
};

export default StacksBoxWithInput;
