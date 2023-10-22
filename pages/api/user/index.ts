import { NextApiRequest, NextApiResponse } from "next";
import { Http } from "@/enum/Http";
import UserModel from "@/models/User";
import { ApiCustom } from "@/lib/ApiCustom";

class UserApi extends ApiCustom {
  async handler(): Promise<void> {
    switch (this.req.method) {
      case Http.GET:
        this.findAll();
        break;
      case Http.POST:
        this.create();
        break;
      default:
        this.res.status(500);
        break;
    }
  }

  async findAll() {
    const data = await UserModel.findOne();
    return this.res.status(200).json({ data });
  }

  async create() {
    const user: UserBody = this.req.body;
    const createUser = new UserModel({
      username: user.username,
      password: user.password,
    });
    const data = await createUser.save();
    this.res.status(201).json({ data });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const api = new UserApi(req, res);
  await api.run();
}

// type
interface UserBody {
  username: string;
  password: string;
}
