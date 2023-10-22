import { Http } from "@/enum/Http";
import VocabModel from "@/models/Vocal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === Http.GET) {
    await findAllVocab(req, res);
  } else {
    return res.status(404);
  }
}

const findAllVocab = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await VocabModel.find({});
    return res.status(200).json({ data });
  } catch (err) {
    if (!(err instanceof Error)) return res.status(500);
    return res.status(500).json({ message: err.message });
  }
};
