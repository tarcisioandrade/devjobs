/* eslint-disable react-hooks/exhaustive-deps */
import SearchLabel from "@components/UI/SearchLabel";
import estadosBR from "@utils/estadosBR.json";
import { FilterValues } from "@components/JobsContainer/JobsContainer";
import { useEffect, SetStateAction, Dispatch } from "react";
import { Button, Label, Select } from "flowbite-react";
import { StacksBoxWithInput, StacksSelected } from "@components/FilterStacks";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiltersIcon } from "@components/svg";

export type Inputs = {
  type: string;
  model: string;
  local: string;
  contract: string;
  search: string;
};

type Props = {
  filterValues: FilterValues;
  setFiltersValues: Dispatch<SetStateAction<FilterValues>>;
  setLoading: (value: boolean) => void;
};

const FiltersContainer = ({
  setFiltersValues,
  filterValues,
  setLoading,
}: Props) => {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [stackToShow, setStackToShow] = useState<string[][]>([]);
  const { register, watch, reset, handleSubmit } = useForm<Inputs>();
  const [openFilters, setOpenFilters] = useState(false);
  const watchAllFields = watch();

  useEffect(() => {
    setLoading(true);
    setFiltersValues({
      ...filterValues,
      type: watchAllFields.type,
      model: watchAllFields.model,
      local: watchAllFields.local,
      contract: watchAllFields.contract,
      stacks: selectedStacks,
    });
  }, [
    selectedStacks,
    watchAllFields.type,
    watchAllFields.model,
    watchAllFields.local,
    watchAllFields.contract,
  ]);

  const resetFilters = () => {
    setLoading(true);
    reset({ model: "", local: "", type: "", contract: "", search: "" });
    setFiltersValues({
      ...filterValues,
      type: "",
      model: "",
      local: "",
      contract: "",
      searchValue: "",
    });
    setSelectedStacks([]);
    setStackToShow([]);
  };

  const removeSelect = (option: string) => {
    const newValue = selectedStacks.filter((item) => item != option);
    const newValueToShow = stackToShow.filter((item) => item[0] != option);
    setSelectedStacks(newValue);
    setStackToShow(newValueToShow);
  };

  const filterButtonHasDisabled =
    filterValues.local == "" &&
    filterValues.model == "" &&
    filterValues.type == "" &&
    selectedStacks.length === 0 &&
    stackToShow.length === 0 &&
    filterValues.searchValue == "" &&
    filterValues.contract == "";

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    setFiltersValues((prevState) => ({
      ...prevState,
      searchValue: data.search,
    }));
  };

  const handleOpenFilters = () => setOpenFilters(!openFilters);

  useEffect(() => {
    const hiddenFiltersInMobileScreen = () => {
      const sizeScreen = screen.width;
      if (sizeScreen < 768) {
        setOpenFilters(false);
      } else {
        setOpenFilters(true);
      }
    };
    hiddenFiltersInMobileScreen();

    window.addEventListener("resize", hiddenFiltersInMobileScreen);

    return () =>
      window.removeEventListener("resize", hiddenFiltersInMobileScreen);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchLabel register={register} />
      </form>
      <Button
        className="md:hidden w-fit ml-auto mt-4"
        size="xs"
        color="success"
        onClick={handleOpenFilters}
      >
        <FiltersIcon />
      </Button>
      <div className={`${openFilters ? "block" : "hidden"}`}>
        <div className="flex flex-col md:flex-row gap-6 items-center mt-5 whitespace-nowrap">
          <div className="w-full md:w-[230px]">
            <StacksBoxWithInput
              selectedStacks={selectedStacks}
              setSelectedStacks={setSelectedStacks}
              setStackToShow={setStackToShow}
            />
          </div>

          <div className="w-full md:w-[170px]">
            <Label htmlFor="tipo" value="Tipo da Vaga" className="sr-only" />
            <Select id="tipo" {...register("type")}>
              <option value="">Tipo da Vaga</option>
              <option value="estagio">Estágio</option>
              <option value="junior">Junior</option>
              <option value="pleno">Pleno</option>
              <option value="senior">Sênior</option>
            </Select>
          </div>

          <div className="w-full md:w-[200px]">
            <Label
              htmlFor="model"
              value="Modelo de Trabalho"
              className="sr-only"
            />
            <Select id="model" {...register("model")}>
              <option value="">Modelo de Trabalho</option>
              <option value="remoto">Remoto</option>
              <option value="presencial">Presencial</option>
              <option value="hibrido">Híbrido</option>
            </Select>
          </div>

          <div className="w-full md:w-[140px]">
            <Label htmlFor="local" value="Local" className="sr-only" />
            <Select id="local" {...register("local")}>
              <option value="">Local</option>
              {estadosBR.UF.map(({ sigla }) => (
                <option key={sigla} value={sigla}>
                  {sigla}
                </option>
              ))}
            </Select>
          </div>

          <div className="w-full md:w-[140px]">
            <Label htmlFor="contract" value="Contrato" className="sr-only" />
            <Select id="contract" {...register("contract")}>
              <option value="">Contrato</option>
              <option value="clt">CLT</option>
              <option value="pj">PJ</option>
              <option value="temporary">Temporário</option>
            </Select>
          </div>

          <div>
            <Button
              color="success"
              size="md"
              onClick={resetFilters}
              disabled={filterButtonHasDisabled}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>

      <StacksSelected stacks={stackToShow} removeSelect={removeSelect} />
    </div>
  );
};

export default FiltersContainer;
