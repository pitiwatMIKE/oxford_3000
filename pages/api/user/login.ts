import { NextApiRequest, NextApiResponse } from "next";
import { Http } from "@/enum/Http";
import UserModel, { User } from "@/models/User";
import { ApiCustom } from "@/lib/ApiCustom";
import bcrypt from "bcrypt";

class LoginApi extends ApiCustom {
  async handler(): Promise<void> {
    switch (this.req.method) {
      case Http.POST:
        this.login();
        break;
      default:
        this.res.status(500);
        break;
    }
  }

  async login() {
    try {
      const userBody: User = this.req.body;
      const user: User | null = await UserModel.findOne({
        email: userBody.email,
      });

      if (!user) {
        return this.res
          .status(404)
          .json({ message: `Not Found User ${userBody.email}` });
      }

      bcrypt.compare(userBody.password, user.password, (err, result) => {
        if (err) throw new Error(err.message);
        if (result) {
          return this.res.status(200).json({ data: user.email });
        } else {
          return this.res.status(401).json({ message: "Unauthorized" });
        }
      });
    } catch (err) {
      if (!(err instanceof Error)) return this.res.status(500);
      return this.res.status(401).json({ message: err.message });
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api = new LoginApi(req, res);
  await api.run();
}
