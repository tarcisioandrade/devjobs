export type User = {
  id_user: number;
  account_type: string;
  status_user: string;
  email: string;
  name: string;
  surname: string;
  biography: string;
  localization: string;
  gender:string;
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
