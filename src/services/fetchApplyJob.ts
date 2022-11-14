import axios from "axios";

const fetchApplyJob = async (id_job: number, id_user: number) => {
  const res = await axios.post("/jobapply", { id_job, id_user });

  return res;
};

export default fetchApplyJob;
