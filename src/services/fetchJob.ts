import { FilterValues } from "@components/JobsContainer/JobsContainer";
import axios from "axios";

export const fetchJob = async ({
  searchValue,
  local,
  model,
  type,
}: FilterValues) => {
  const { data } = await axios.get(
    `/jobs?search=${searchValue}&tipo=${type}&model=${model}&local=${local}`
  );

  return data;
};

export const fetchJobWithBlob = async (blob: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/job?blob=${blob}`);

  return data;
};
