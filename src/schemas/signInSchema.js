import Joi from "joi";

const signInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().min(8).required(),
});

export default signInSchema;
