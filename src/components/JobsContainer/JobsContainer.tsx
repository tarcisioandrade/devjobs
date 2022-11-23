import JobCard from "@components/JobCard";
import { Job } from "../../types/Job";
import { useEffect, useState } from "react";
import { fetchJob } from "@services/fetchJob";
import FiltersContainer from "@components/FiltersContainer";
import { useForm, SubmitHandler } from "react-hook-form";
import SearchLabel from "@components/UI/SearchLabel";
import Spinner from "@components/UI/Spinner";
import { EggBreak, SadEmoji } from "@components/svg";

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
  const [jobs, setJobs] = useState<Job[] | null>(null);
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

  const allJobs =
    jobs && jobs.length > 0 ? (
      <div className="flex flex-col mt-10 gap-4">
        {jobs?.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    ) : null;

  return (
    <main className="mainContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchLabel register={register} />
      </form>
      <FiltersContainer
        filterValues={filterValues}
        setFiltersValues={setFilterValues}
      />

      {loading ? <Spinner /> : allJobs}

      {jobs?.length === 0 ? (
        <div className="flex items-center justify-center h-[calc(100%-80px)]">
          <div className="text-gray-600 text-3xl">
            Nenhum resultado encontrado.
            <div className="flex items-center justify-center mt-2">
              <EggBreak />
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="flex items-center justify-center h-[calc(100%-80px)]">
          <div className="text-gray-600 text-3xl">
            Algum erro aconteceu, por favor, tente novamente!
            <div className="flex items-center justify-center mt-2">
              <SadEmoji />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default JobsContainer;
