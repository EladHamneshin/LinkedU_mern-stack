import Joi from "joi";

const authValidation = (reqBody: any) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.empty': `user "email" cannot be an empty field`,
        'string.email': 'user "email" must be a valid email',
        'any.required': `user "email" is a required field`,
      }),
    password: Joi.string()
      .required()
      .messages({
        'string.empty': `user "password" cannot be an empty field`,
        'any.required': `user "password" is a required field`,
      }),
  });
  return schema.validate(reqBody);
};

export default authValidation;
