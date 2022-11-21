import axios from "axios";
import { JobPost } from "src/types/Job";

const fetchJobPost = async (job: JobPost) => {
  const data = await axios.post("/jobpost", { ...job });

  return data;
};

export default fetchJobPost;
