import api from "@libs/axiosInstance";

type Props = {
  id: string;
  user_type: string;
  name: string;
  surname: string;
  avatar: string;
  location: string;
  biography: string;
  gender: string;
  website_url: string;
  github_url: string;
  linkedin_url: string;
  stacks: string[];
};

const fetchUserUpdate = async (userInfos: Props) => {
  const {
    avatar,
    biography,
    gender,
    github_url,
    id,
    linkedin_url,
    location,
    name,
    stacks,
    surname,
    user_type,
    website_url,
  } = userInfos;
  const res = await api.patch("api/user", {
    id,
    user_type,
    name,
    surname,
    avatar,
    location,
    biography,
    gender,
    website_url,
    github_url,
    linkedin_url,
    stacks,
  });

  return res;
};

export default fetchUserUpdate;
