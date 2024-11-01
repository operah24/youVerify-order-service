import mongoose from "mongoose";
import { Schema } from "./Schema";

export interface IOrder {
  _id?: string;
  itemId: string;
  itemName?: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}


const OrderSchema = new mongoose.Schema<IOrder>({
  itemId: {type: String, required: true},
  itemName: { type: String},
  quantity: { type: Number, required: true },
},{
  timestamps: true
});

export const Order = mongoose.model<IOrder>(Schema.Order, OrderSchema);