import ApiError from "../../../../ApiError";
import * as ApiCall from "../../helpers/apis";

export const getItem = async (itemId: string) => {
    try {
     const path = `/item/${itemId}`;
     const response = await ApiCall.get(path);
     return response.data;
 
    } catch (error: any) {
     throw new ApiError(error.message)
    }
 }