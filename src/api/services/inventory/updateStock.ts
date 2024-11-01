import ApiError from "../../../../ApiError";
import * as ApiCall from "../../helpers/apis";


export const updateStock = async (itemId: string, quantity: number) => {
   try {
    const path = `/item/${itemId}/deductStock`;
    const response = await ApiCall.put({stockQuantity: quantity}, path);
    return response.data;

   } catch (error: any) {
     throw new ApiError(error.message)
   }
}