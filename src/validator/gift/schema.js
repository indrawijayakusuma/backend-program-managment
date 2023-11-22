const Joi = require('joi');

const PostGiftSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('visitor', 'merchant').required(),
});

module.exports = PostGiftSchema;
