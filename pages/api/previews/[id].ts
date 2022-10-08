import type { NextApiRequest, NextApiResponse } from "next";
import { getPreviews } from "../../../services/getPreviews";

const previewAPI = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("previewAPI");
  const { id } = req.query as { id: string };
  const contract = await getPreviews(id);
  if (!contract.data) {
    console.log("No contract found");
    return res.status(404).end();
  }
  res.status(200).json(contract);
};

export default previewAPI;
