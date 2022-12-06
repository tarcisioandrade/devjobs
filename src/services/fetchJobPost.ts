import api from "@libs/axiosInstance";
import { JobPost } from "src/types/Job";

const fetchJobPost = async (job: JobPost) => {
  const data = await api.post("api/job", { ...job });

  return data;
};

export default fetchJobPost;
