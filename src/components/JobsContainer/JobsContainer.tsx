/* eslint-disable react-hooks/exhaustive-deps */
import Jobs from "@components/JobCard";
import { Job } from "../../types/Job";
import React, { FormEvent, useEffect, useState } from "react";
import fetchJob from "@services/fetchJob";
import { Button, TextInput, Label } from "flowbite-react";
import FiltersContainer from "@components/FiltersContainer";
import { useForm, SubmitHandler } from "react-hook-form";

type Input = {
  search: string;
};

export type FilterValues = {
  searchValue: string;
  type: string;
  model: string;
  local: string;
};

const JobsContainer = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    searchValue: "",
    type: "",
    model: "",
    local: "",
  });

  const { register, handleSubmit } = useForm<Input>();

  const getData = async (searchValue: FilterValues) => {
    try {
      setError(false);
      setLoading(true);
      const data = await fetchJob(searchValue);
      setJobs(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(filterValues);
  }, [filterValues]);

  const onSubmit: SubmitHandler<Input> = (data) => {
    setFilterValues((prevState) => ({
      ...prevState,
      searchValue: data.search,
    }));
  };

  return (
    <div className="container mx-auto mt-24">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <Label htmlFor="search" className="sr-only" value="Pesquisar" />
          <TextInput
            type="text"
            id="search"
            placeholder="O que proucura?"
            sizing="lg"
            className="lg:min-w-[400px]"
            style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
            {...register("search")}
          />
          <Button size="xl" type="submit" positionInGroup="end">
            Buscar
          </Button>
        </div>
      </form>
      <FiltersContainer filterValues={filterValues} setFiltersValues={setFilterValues}/>

      {loading ? <p>Loading</p> : <Jobs jobs={jobs} />}

      {jobs.length === 0 && !error && (
        <p className="text-white">Nenhum resultado encontrado!</p>
      )}
      {error && <span>Algum erro aconteceu, por favor, tente novamente!</span>}
    </div>
  );
};

export default JobsContainer;
