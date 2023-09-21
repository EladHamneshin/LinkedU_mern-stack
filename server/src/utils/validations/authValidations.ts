import Joi from "joi";

const authValidation = (reqBody: any) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  });
  return schema.validate(reqBody);
};

export default authValidation;
