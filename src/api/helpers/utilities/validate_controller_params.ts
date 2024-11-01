import { Schema } from "joi";
import ApiError from "../../../../ApiError";

export const validateControllerParams = (schema: Schema, params: any) => {
  const { error } = schema.validate(params);

  if (error) {
    let { message } = error.details ? error.details[0] : error;
    message = message.replace(/"/g, "");

    // todo: converts to other languages here
    throw new ApiError(message)
  }
}