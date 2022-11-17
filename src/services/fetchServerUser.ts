import axios from "axios";

const fetchServerUser = async () => {
  const { data } = await axios.get("http://localhost:3000/api/user");

  return data;
};

export default fetchServerUser;

