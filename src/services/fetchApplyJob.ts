import api from "@libs/axiosInstance";

const fetchApplyJob = async (id_job: number, id_user: number) => {
  const res = await api.post("jobapply", { id_job, id_user });

  return res;
};

export default fetchApplyJob;
