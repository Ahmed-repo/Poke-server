const Joi = require("joi");

const registerValidation = (data) => {
  const schema = {
    name: Joi.string().required().min(2),
    email: Joi.string().email().min(4).required(),
    password: Joi.string().required().min(4),
  };
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().email().min(4).required(),
    password: Joi.string().required().min(4),
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
