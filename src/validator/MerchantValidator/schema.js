const Joi = require('joi');

const PostMerchantSchema = Joi.object({
  no_ktp: Joi.string().required(),
  name: Joi.string().required(),
  rekening: Joi.string().required(),
  merchant_name: Joi.string().required(),
  no_booth: Joi.number().min(1).required(),
});

module.exports = PostMerchantSchema;
