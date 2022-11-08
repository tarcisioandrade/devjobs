import JobsCard from "@components/JobCard";
import { Job } from "../../types/Job";
import { useEffect, useState } from "react";
import { fetchJob } from "@services/fetchJob";
import FiltersContainer from "@components/FiltersContainer";
import { useForm, SubmitHandler } from "react-hook-form";
import SearchLabel from "@components/UI/SearchLabel";
import Skeleton from "@components/Skeleton/Skeleton";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchLabel register={register} />
      </form>
      <FiltersContainer
        filterValues={filterValues}
        setFiltersValues={setFilterValues}
      />
      {loading ? <Skeleton /> : <JobsCard jobs={jobs} />}

      {jobs.length === 0 && !error && (
        <p className="text-white">Nenhum resultado encontrado!</p>
      )}
      {error && <span>Algum erro aconteceu, por favor, tente novamente!</span>}
    </div>
  );
};

export default JobsContainer;
