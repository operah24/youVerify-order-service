import ApiError from "../../../../ApiError";
import { IObjectProp } from "../../helpers/interfaces";
import { IOrder, Order } from "../../models/order";
import inventoryService from "../inventory";

export const createOrder = async (requestBody: IOrder) => {
  const {quantity, itemId} = requestBody;

  const item = await inventoryService.getItem(itemId);
  if (!item) {
    throw new ApiError("ITEM DOES NOT EXISTS");
  }
  
  if(item.stockQuantity == 0 ){
    throw new ApiError("INVENTORY DOES NOT HAVE SUFFICIENT QUANTITY FOR YOUR ORDER");
  }

  if(quantity > item.stockQuantity){
    throw new ApiError(`INVENTORY HAS ${item.stockQuantity} QUANTITY AVAILABLE`);
  }

  const newOrder: IObjectProp = {};
  newOrder["itemId"] = itemId;
  newOrder["itemName"] = item.itemName.toLowerCase();
  newOrder["quantity"] = +quantity;
  newOrder["createdAt"] = new Date(Date.now());

  const orderModel = new Order(newOrder);
  await orderModel.save();
  newOrder._id = orderModel._id;

  await inventoryService.updateStock(itemId, quantity);

  return newOrder;
};
