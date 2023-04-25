import Joi from "joi";

const recordSchema = Joi.object({
  amount: Joi.string().required(),
  description: Joi.string().required(),
});

export default recordSchema;
