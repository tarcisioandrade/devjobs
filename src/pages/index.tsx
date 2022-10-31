import { FormEvent, useState, useEffect } from "react";
import Header from "@components/Header";
import Jobs from "@components/JobCard";
import UserProvider from "@contexts/userContext";
import fetchJob from "@services/fetchJob";
import { Job } from "../types/Job";

const Home = () => {
  const [searchValue, setsearchValue] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchJob();
      setJobs(data);
    };
    getData();
  }, []);

  const hadleFilterJobs = () => {
    const value = searchValue?.toLocaleLowerCase();

    const jobsFiltered = jobs.filter((item) => {
      if (searchValue) {
        const targetStack = item.stacks.some((stack) =>
          stack.toLowerCase().includes(value as string)
        );
        const targetTitle = item.title
          .toLocaleLowerCase()
          .includes(value as string);

        return targetStack || targetTitle;
      }

      return item;
    });

    setJobs(jobsFiltered);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    hadleFilterJobs();
  };

  return (
    <main className="bg-gray-900 dark">
      {/* Header  */}
      <UserProvider>
        <Header />
      </UserProvider>
      <div className="container mx-auto h-screen">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="rounded p-4 bg-slate-200"
            onChange={({ target }) => setsearchValue(target.value)}
          />
          <button className="bg-blue-500 p-4 text-white rounded">Buscar</button>
        </form>

        <Jobs jobs={jobs} />
      </div>
    </main>
  );
};

export default Home;
