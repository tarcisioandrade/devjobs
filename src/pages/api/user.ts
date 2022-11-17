import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../data.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = data.users.find((user) => user.id_user == 59);

  res.status(200).json(user);
}
