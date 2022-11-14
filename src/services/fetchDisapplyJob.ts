import axios from "axios";

const fetchDisapplyJob = async (id_job: number, id_user: number) => {
  const res = await axios.delete(`/jobdisapply?job=${id_job}&user=${id_user}`);

  return res;
};

export default fetchDisapplyJob;
