export type CandidatesStatus = {
  id_user: number;
  status: "applied" | "approved";
};

export type Job = {
  id: number;
  id_company: number;
  title: string;
  location: string;
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
