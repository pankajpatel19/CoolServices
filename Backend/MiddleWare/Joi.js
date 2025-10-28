import Joi from "joi";

export const userRegistrationSchema = Joi.object({
  userName: Joi.string().min(3).required().messages({
    "string.min": "Username must be at least 3 characters long",
    "any.required": "Username is required",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.length": "Phone number must be exactly 10 digits",
      "string.pattern.base": "Phone number must only contain digits",
    }),

  userrole: Joi.string()
    .valid("customer", "technician", "admin")
    .required()
    .messages({
      "any.required": "User role is required",
    }),

  avatar: Joi.string().uri().optional(),
  coverImage: Joi.string().uri().optional(),
});

export const loginRegisterSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),

  userrole: Joi.string()
    .valid("customer", "technician", "admin")
    .required()
    .messages({
      "any.required": "User role is required",
    }),
});
