import api from "@libs/axiosInstance";

const fetchUserJobsApplied = async (id_user: string) => {
  const { data } = await api.get(`/api/job/jobsapplied?id_user=${id_user}`);

  return data;
};

export default fetchUserJobsApplied;
