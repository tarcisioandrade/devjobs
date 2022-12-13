import api from "@libs/axiosInstance";

const fetchApplyJob = async (id_job: string, id_user: string) => {
  const res = await api.patch("/api/job/jobapply", { id_job, id_user });

  return res;
};

export default fetchApplyJob;
