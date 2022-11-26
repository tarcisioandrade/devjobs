import { FilterValues } from "@components/JobsContainer/JobsContainer";
import api from "@libs/axiosInstance";

export const fetchJob = async ({
  searchValue,
  local,
  model,
  type,
}: FilterValues) => {
  const { data } = await api.get(
    `jobs?search=${searchValue}&tipo=${type}&model=${model}&local=${local}`
  );

  return data;
};

export const fetchJobWithBlob = async (blob: string) => {
  const { data } = await api.get(`api/job?blob=${blob}`);

  return data;
};
