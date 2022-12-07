import api from "@libs/axiosInstance";
import { Job } from "src/types/Job";

const fetchJobPost = async (job: Partial<Job>) => {
  const data = await api.post("api/job", { ...job });

  return data;
};

export default fetchJobPost;
