import api from "@libs/axiosInstance";

type Props = {
  id: string;
  id_devjobs: string;
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
  fluents: string[]
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
    fluents,
    id_devjobs
  } = userInfos;
  const res = await api.patch("api/user", {
    id,
    id_devjobs,
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
    fluents
  });

  return res;
};

export default fetchUserUpdate;
