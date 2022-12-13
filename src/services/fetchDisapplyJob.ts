import api from "@libs/axiosInstance";

const fetchDisapplyJob = async (id_job: string, id_user: string) => {
  const res = await api.patch(`/api/job/jobdisapply`, { id_job, id_user });

  return res;
};

export default fetchDisapplyJob;
