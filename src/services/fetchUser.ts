import api from "@libs/axiosInstance";

const fetchUser = async () => {
  const { data } = await api.get("login");

  return data;
};

export default fetchUser;
