import { FilterValues } from "@components/JobsContainer/JobsContainer";
import api from "@libs/axiosInstance";

export const fetchJob = async (
  { searchValue, local, model, type, contract, stacks }: FilterValues,
  id: string
) => {
  const URL_API = new URL("http://localhost:3000/api/job");

  local && URL_API.searchParams.append("location", local);
  searchValue && URL_API.searchParams.append("searchTitle", searchValue);
  model && URL_API.searchParams.append("model", model);
  type && URL_API.searchParams.append("type", type);
  contract && URL_API.searchParams.append("contract", contract);
  stacks &&
    stacks.forEach((stack) => {
      URL_API.searchParams.append("stacksFind", stack);
    });

  const { data } = await api.get(URL_API.href, { params: { id, page: "1" } });

  return data;
};

export const fetchJobWithBlob = async (blob: string) => {
  const { data } = await api.get(`api/job/${blob}`);

  return data;
};
