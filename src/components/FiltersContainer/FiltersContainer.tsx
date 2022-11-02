import { FilterValues } from "@components/JobsContainer/JobsContainer";
import { Label, Select } from "flowbite-react";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

type Inputs = {
  type: string;
  model: string;
  local: string;
};

type Props = {
  filterValues: FilterValues;
  setFiltersValues: (newFilter: FilterValues) => void;
};

const FiltersContainer = ({ setFiltersValues, filterValues }: Props) => {
  const { register, watch } = useForm<Inputs>();

  useEffect(() => {
    const { unsubscribe } = watch((data) => {
      setFiltersValues({
        ...filterValues,
        type: data.type as string,
        model: data.model as string,
        local: data.local as string,
      });
    });

    return () => unsubscribe();
  }, [watch, filterValues, setFiltersValues]);

  return (
    <div className="flex gap-6 items-center mt-5 justify-center">
      <div id="select" className="w-[200px]">
        <Label htmlFor="tipo" value="Tipo de Vaga" className="sr-only" />
        <Select id="tipo" {...register("type")}>
          <option value="">Tipo da Vaga</option>
          <option value="estagio">Estágio</option>
          <option value="junior">Junior</option>
          <option value="pleno">Pleno</option>
          <option value="senior">Sênior</option>
        </Select>
      </div>

      <div id="select" className="w-[200px]">
        <Label htmlFor="model" value="Local" className="sr-only" />
        <Select id="model" {...register("model")}>
          <option value="">Modelo de Trabalho</option>
          <option value="remoto">Remoto</option>
          <option value="presencial">Presencial</option>
          <option value="hibrido">Híbrido</option>
        </Select>
      </div>

      <div id="select" className="w-[200px]">
        <Label htmlFor="local" value="Local" className="sr-only" />
        <Select id="local" {...register("local")}>
          <option value="">Local</option>
          <option value="ba">BA</option>
          <option value="sp">SP</option>
          <option value="rj">RJ</option>
        </Select>
      </div>
    </div>
  );
};

export default FiltersContainer;
