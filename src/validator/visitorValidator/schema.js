const Joi = require('joi');

const PostVisitorSchema = Joi.object({
  no_ktp: Joi.string().required(),
  name: Joi.string().required(),
  rekening: Joi.string().required(),
  setoran: Joi.number().min(10).required(),
});

module.exports = PostVisitorSchema;
