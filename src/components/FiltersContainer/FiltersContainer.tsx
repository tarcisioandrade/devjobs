/* eslint-disable react-hooks/exhaustive-deps */
import { FilterValues } from "@components/JobsContainer/JobsContainer";
import { Button, Label, Select } from "flowbite-react";
import React, { useEffect } from "react";
import estadosBR from "@utils/estadosBR.json";
import { useForm } from "react-hook-form";
import { StacksBoxWithInput, StacksSelected } from "@components/FilterStacks";
import { useState } from "react";

type Inputs = {
  type: string;
  model: string;
  local: string;
  contract: string;
};

type Props = {
  filterValues: FilterValues;
  setFiltersValues: (newFilter: FilterValues) => void;
};

const FiltersContainer = ({ setFiltersValues, filterValues }: Props) => {
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [stackToShow, setStackToShow] = useState<string[][]>([]);
  const { register, watch, reset } = useForm<Inputs>();

  const watchAllFields = watch();

  useEffect(() => {
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
    reset({ model: "", local: "", type: "", contract: "" });
    setFiltersValues({
      ...filterValues,
      type: "",
      model: "",
      local: "",
      contract: "",
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
    stackToShow.length === 0;

  return (
    <div>
      <div className="flex gap-6 items-center mt-5">
        <div className="w-[120px]">
          <StacksBoxWithInput
            selectedStacks={selectedStacks}
            setSelectedStacks={setSelectedStacks}
            setStackToShow={setStackToShow}
          />
        </div>

        <div className="w-[200px]">
          <Label htmlFor="tipo" value="Tipo da Vaga" className="sr-only" />
          <Select id="tipo" {...register("type")}>
            <option value="">Tipo da Vaga</option>
            <option value="estagio">Estágio</option>
            <option value="junior">Junior</option>
            <option value="pleno">Pleno</option>
            <option value="senior">Sênior</option>
          </Select>
        </div>

        <div className="w-[200px]">
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

        <div className="w-[120px]">
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

        <div className="w-[120px]">
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
            size="sm"
            onClick={resetFilters}
            disabled={filterButtonHasDisabled}
          >
            Limpar Filtros
          </Button>
        </div>
      </div>
      <StacksSelected stacks={stackToShow} removeSelect={removeSelect} />
    </div>
  );
};

export default FiltersContainer;
