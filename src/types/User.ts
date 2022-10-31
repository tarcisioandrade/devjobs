export interface User {
  id_user: number;
  status_user: string;
  email: string;
  name: string;
  surname: string;
  description: string;
  region: string;
  avatar: string;
  stacks: string[];
  employee: boolean;
  jobs_list: string[];
  affiliate_company: string;
  github_url: string;
  linkedin_url: string;
  website_url: string;
  createAt: Date;
}
