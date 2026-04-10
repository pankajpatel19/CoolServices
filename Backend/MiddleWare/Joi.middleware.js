import Joi from "joi";

// User Schemas
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

  avatar: Joi.string().uri().optional(),
  coverImage: Joi.string().uri().optional(),
});

export const loginRegisterSchema = Joi.object({
  phone: Joi.string().required().messages({
    "any.required": "Phone number is required",
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

// Booking Schemas
export const bookingSchema = Joi.object({
  appliance: Joi.string().min(2).required(),
  company: Joi.string().required(),
  issue: Joi.string().min(5).required(),
  address: Joi.string().required(),
  pincode: Joi.string().length(6).pattern(/^\d+$/).required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().length(10).pattern(/^\d+$/).required(),
  email: Joi.string().email().required(),
});

export const updateBookingSchema = Joi.object({
  status: Joi.string().valid("New", "In Progress", "Done", "cancel").optional(),
  technician: Joi.string().valid("ajay", "anuj", "rohit").optional(),
});

// Technician Schema
export const technicianLocationSchema = Joi.object({
  technicianId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

// Complain Schema
export const complaintSchema = Joi.object({
  subject: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  bookingId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
});
