import api from "@libs/axiosInstance";

const fetchUserJobsApplied = async (id_user: number) => {
  const { data } = await api.get(`api/userjobsapplied?user=${id_user}`);

  return data;
};

export default fetchUserJobsApplied;
