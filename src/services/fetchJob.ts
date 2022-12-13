import { FilterValues } from "@components/JobsContainer/JobsContainer";
import axios from "axios";

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
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/job/${blob}`
  );

  return data;
};
