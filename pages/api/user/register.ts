import { NextApiRequest, NextApiResponse } from "next";
import { Http } from "@/enum/Http";
import UserModel, { User, validateEmail } from "@/models/User";
import { ApiCustom } from "@/lib/ApiCustom";
import bcrypt from "bcrypt";

class RegisterApi extends ApiCustom {
  async handler(): Promise<void> {
    switch (this.req.method) {
      case Http.POST:
        this.register();
        break;
      default:
        this.res.status(500);
        break;
    }
  }

  async register() {
    try {
      const userBody: User = this.req.body;

      if (
        !userBody.email ||
        !userBody.password ||
        userBody.email == "" ||
        userBody.password == ""
      ) {
        return this.res.status(400).json({ message: "invalid input" });
      }

      if (!validateEmail(userBody.email)) {
        return this.res
          .status(400)
          .json({ message: "Please fill a valid email address" });
      }

      const user = await UserModel.findOne(
        { email: userBody.email },
        { password: 0 }
      );

      if (user) {
        return this.res
          .status(400)
          .json({ message: `User ${userBody.email} exist in database` });
      }

      bcrypt.hash(userBody.password, 10, async (err, hash) => {
        if (err) throw new Error(err.message);

        await UserModel.create({
          email: userBody.email,
          password: hash,
        });

        return this.res
          .status(201)
          .json({ message: `Create user ${userBody.email} success` });
      });
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
  const api = new RegisterApi(req, res);
  await api.run();
}
