export type User = {
  id: string;
  user_type: string;
  email: string;
  name: string;
  surname: string;
  biography: string;
  location?: string;
  gender: string;
  avatar: string;
  stacks: string[];
  employee: boolean;
  jobs: string[];
  github_url: string;
  linkedin_url: string;
  website_url: string;
  updatedAt: Date;
  createdAt: Date;
};
