
import { NextFunction, Request, Response  } from 'express';
import { controller, post, get } from '../../decorators';
import Utilities from "../helpers/utilities";
import Joi from 'joi';
import * as ControllerParams from "./utils/get_controller_params";
import OrderService from "../services/order"

@controller("/order/")
export default class OrderController {
  @post("create")
  async createOrder
  (req: Request, res: Response, next: NextFunction) {
    try {
      req.body = Utilities.trimCollection(req.body);

      const schema = schemas.createOrder;
      Utilities.validateControllerParams(schema, req.body);
      
      const data = await OrderService.createOrder(
        req.body
      );

      return Utilities.sendResponse(
        res,
        "Order Has Been Created Successfully",
        201,
        data
      );
    } catch (error) {
      next(error);
    }
  }

  @get(":id")
  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await OrderService.getOrderDetails(req.params.id );
      return Utilities.sendResponse(res, "Single Order Details ", 200, data)
    } catch (error) {
      next(error)
    }
  }
}


const schemas = {
    createOrder: Joi.object(ControllerParams.getCreateOrderParams())
};