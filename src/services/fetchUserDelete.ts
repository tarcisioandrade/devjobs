import api from "@libs/axiosInstance";

const fetchUserDelete = async (id: string) => {
  const res = await api.delete("api/user", { data: id });

  return res;
};

export default fetchUserDelete;
