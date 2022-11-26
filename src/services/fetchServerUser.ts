import api from "@libs/axiosInstance";

const fetchServerUser = async () => {
  const { data } = await api.get("api/user");

  return data;
};

export default fetchServerUser;

