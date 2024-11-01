import { IOrder, Order } from "../models/order";

export const getOrderByMatch = async (match: any) => {
    return Order.findOne<IOrder>(match).exec();
}