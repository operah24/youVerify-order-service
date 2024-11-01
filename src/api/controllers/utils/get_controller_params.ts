import Joi from "joi";

export const getCreateOrderParams = () => {
  return {
    itemName: Joi.string(),
    itemId: Joi.string().required(),
    quantity: Joi.number().required(),
  }
}
