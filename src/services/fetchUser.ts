import api from "@libs/axiosInstance";

const fetchUser = async () => {
  const { data } = await api.get("login");

  return data;
};

export const fetchUserWithIdDevJobs = async (id: string) => {
  const { data } = await api.get(`/api/user/id_devjobs`, { params: { id } });

  return data;
};

export default fetchUser;
