import { controller, get } from "../../decorators";
import { Request, Response } from "express";

@controller("/order/home")
export default class RootController {
  @get("/")
  home(_req: Request, res: Response) {
    res.status(200).json({
      message: "Hello!",
      data: {
        platform: "YouVerify Order Service",
        version: "1.0.0",
        author: "Opeyemi Bantale"
      }
    });
  }
}