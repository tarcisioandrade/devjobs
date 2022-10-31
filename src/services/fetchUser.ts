import axios from "axios";

const fetchUser = async () => {
  const { data } = await axios.get("/login");

  return data;
};

export default fetchUser;
