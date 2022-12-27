import api from "@libs/axios";
import { User } from "src/types/User";

const fetchUser = async () => {
  const { data } = await api.get("login");

  return data;
};

export const fetchUserWithIdDevJobs = async (id: string) => {
  const { data } = await api.get(`/api/user/id_devjobs`, { params: { id } });

  return data;
};

export default fetchUser;

export const fetchUserLogin = async (
  crenditals: Record<"email" | "password", string> | undefined
) => {
  const res = await api.post("api/user/login", {
    email: crenditals?.email,
    password: crenditals?.password,
  });

  return res;
};

export const fetchServerUser = async (id: string) => {
  const { data } = await api.get(`api/user`, { params: { id } });

  return data;
};

export const fetchUserDelete = async (id: string) => {
  const res = await api.delete("api/user", { data: id });

  return res;
};

export const fetchUserJobsApplied = async (id_user: string) => {
  const { data } = await api.get(`/api/job/jobsapplied`, {
    params: { id_user },
  });

  return data;
};

export const fetchUserUpdate = async (userInfos: Partial<User>) => {
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
    id_devjobs,
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
    fluents,
  });

  return res;
};
