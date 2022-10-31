import axios from "axios";

const fetchJob = async () => {
  const { data } = await axios.get("/jobs");

  return data;
};

export default fetchJob;
