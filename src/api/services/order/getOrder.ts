import mongoose from "mongoose";
import ApiError from "../../../../ApiError";
import { getOrderByMatch } from "../../repositories";

const ObjectId = mongoose.Types.ObjectId;
export const getOrderDetails = async(id: string) => {
    const order = await getOrderByMatch({_id: new ObjectId(id)})
    if(!order){
        throw new ApiError("No Order Found", 400, null)
    }
    return order
}