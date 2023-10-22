import { NextApiRequest, NextApiResponse } from "next";
import { Http } from "@/enum/Http";
import UserModel from "@/models/User";
import { ApiCustom } from "@/lib/ApiCustom";

class UserApi extends ApiCustom {
  async handler(): Promise<void> {
    switch (this.req.method) {
      case Http.GET:
        this.finAllUser();
        break;
      default:
        this.res.status(500);
        break;
    }
  }

  async finAllUser() {
    try {
      const data = await UserModel.find({}, { password: 0 });
      return this.res.status(200).json({ data });
    } catch (err) {
      if (!(err instanceof Error)) return this.res.status(500);
      return this.res.status(500).json({ message: err.message });
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api = new UserApi(req, res);
  await api.run();
}
