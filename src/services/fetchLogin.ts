import api from "@libs/axiosInstance";

const fetchLogin = async (
  crenditals: Record<"email" | "password", string> | undefined
) => {
  const res = await api.post("api/user/login", {
    email: crenditals?.email,
    password: crenditals?.password,
  });

  return res;
};

export default fetchLogin;
