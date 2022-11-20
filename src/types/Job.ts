export type CandidatesStatus = {
  id_user: number;
  status: "applied" | "approved";
};

export type Job = {
  id: number;
  id_user: number;
  title_job: string;
  company_name: string;
  company_email: string;
  model: string;
  location: string;
  description: string;
  type: string;
  contract: string;
  status: string;
  benefits: string[];
  stacks: string[];
  blob: string;
  candidates_status: CandidatesStatus[];
  createAt: Date;
  modifiedAt: Date;
};


