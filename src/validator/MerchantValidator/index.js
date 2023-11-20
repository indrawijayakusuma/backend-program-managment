const InvariantError = require('../../exceptions/InvariantError');
const PostMerchantSchema = require('./schema');

const VisitorValidator = {
  validateMerchantPayload: (payload) => {
    const validatorResult = PostMerchantSchema.validate(payload);
    if (validatorResult.error) {
      throw new InvariantError(validatorResult.error.message);
    }
  },
};

module.exports = VisitorValidator;
