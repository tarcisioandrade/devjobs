import api from "@libs/axios";
import axios from "axios";
import { FilterValues } from "@components/JobsContainer/JobsContainer";
import { Job } from "src/types/Job";

export const fetchJob = async (
  { searchValue, local, model, type, contract, stacks }: FilterValues,
  id: string,
  offset: number
) => {
  const URL_API = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/job`);

  local && URL_API.searchParams.append("location", local);
  searchValue && URL_API.searchParams.append("searchTitle", searchValue);
  model && URL_API.searchParams.append("model", model);
  type && URL_API.searchParams.append("type", type);
  contract && URL_API.searchParams.append("contract", contract);
  stacks &&
    stacks.forEach((stack) => {
      URL_API.searchParams.append("stacksFind", stack);
    });

  const { data } = await axios.get(URL_API.href, {
    params: { id, offset: offset.toString() },
  });

  return data;
};

export const fetchJobWithBlob = async (blob: string) => {
  const { data } = await api.get(`/api/job/${blob}`);

  return data;
};

export const fetchJobsPosted = async (id_user: string) => {
  const { data } = await api.get(`/api/job/jobsposted`, {
    params: { id_user },
  });

  return data;
};

export const fetchDeleteJob = async (id: string) => {
  const { data } = await api.delete(`/api/job`, { params: { id } });

  return data;
};

export const fetchDisapplyJob = async (id_job: string, id_user: string) => {
  const res = await api.patch(`/api/job/jobdisapply`, { id_job, id_user });

  return res;
};

export const fetchApplyJob = async (id_job: string, id_user: string) => {
  const res = await api.patch("/api/job/jobapply", { id_job, id_user });

  return res;
};

export const fetchJobPost = async (job: Partial<Job>) => {
  const data = await api.post("api/job", { ...job });

  return data;
};

