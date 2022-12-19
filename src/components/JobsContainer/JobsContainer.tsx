import JobCard from "@components/JobCard";
import FiltersContainer from "@components/FiltersContainer";
import Skeleton from "@components/UI/Skeleton";
import { Job } from "../../types/Job";
import { useEffect, useState } from "react";
import { EggBreak, SadEmoji } from "@components/svg";
import { fetchJob } from "@services/fetchJob";
import { User } from "src/types/User";

export type FilterValues = {
  searchValue: string;
  type: string;
  model: string;
  local: string;
  contract: string;
  stacks: string[];
};

export const InitialFilterValues = {
  searchValue: "",
  type: "",
  model: "",
  local: "",
  contract: "",
  stacks: [],
};

type Props = {
  user: User | null;
};

const JobsContainer = ({ user }: Props) => {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(6);

  const [filterValues, setFilterValues] =
    useState<FilterValues>(InitialFilterValues);

  const getInitialAndFilterData = async (searchValue: FilterValues) => {
    try {
      setError(false);
      const data = await fetchJob(searchValue, user?.id as string, offset);
      setJobs(data);
    } catch (error) {
      setError(true);
      setJobs(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInitialAndFilterData(filterValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, filterValues]);

  useEffect(() => {
    const scrollTheEnd = () => {
      const scrolEnd =
        window.scrollY + window.innerHeight - 40 >= document.body.scrollHeight;
      if (scrolEnd) {
        setOffset((prev) => prev + 6);
      }
    };
    window.addEventListener("scroll", scrollTheEnd);

    return () => window.removeEventListener("scroll", scrollTheEnd);
  }, []);

  const allJobsBox =
    jobs && jobs.length > 0 ? (
      <div className="flex flex-col mt-10 gap-4">
        {jobs?.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    ) : null;

  return (
    <main className="mainContainer">
      <FiltersContainer
        filterValues={filterValues}
        setFiltersValues={setFilterValues}
        setLoading={setLoading}
      />

      {loading ? <Skeleton /> : allJobsBox}

      {!loading && jobs?.length === 0 ? (
        <div className="flex items-center justify-center mt-16">
          <div className="text-gray-600 text-3xl text-center">
            Nenhum resultado encontrado.
            <div className="flex items-center justify-center mt-2">
              <EggBreak />
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="flex items-center justify-center mt-16">
          <div className="text-gray-600 text-3xl text-center">
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
