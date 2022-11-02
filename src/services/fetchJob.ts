import { FilterValues } from "@components/JobsContainer/JobsContainer";
import axios from "axios";

const fetchJob = async ({ searchValue, local, model, type }: FilterValues) => {
  const { data } = await axios.get(
    `/jobs?palavra=${searchValue}&tipo=${type}&model=${model}&local=${local}`
  );

  return data;
};

export default fetchJob;
