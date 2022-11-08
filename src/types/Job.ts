export type CandidatesStatus = {
  id_user: number;
  status: "applied" | "approved";
};

export type Job = {
  id: number;
  id_company: number;
  company_avatar: string;
  company_name: string;
  company_email: string;
  title: string;
  location: string;
  model: string;
  contract: string;
  benefits: string[];
  description: string;
  level: string;
  type: string;
  status: string;
  blob: string;
  stacks: string[];
  candidates_status: CandidatesStatus[];
  createAt: Date;
  modifiedAt: Date;
};
