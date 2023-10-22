import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./dbConect";

export abstract class ApiCustom {
  req: NextApiRequest;
  res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  async init() {
    await dbConnect();
  }

  async run() {
    await this.init();
    await this.handler();
  }

  abstract handler(): Promise<void>;
}
