import api from "@libs/axiosInstance";

const fetchServerUser = async (id: string) => {
  const { data } = await api.get(`api/user/${id}`);

  return data;
};

export default fetchServerUser;
