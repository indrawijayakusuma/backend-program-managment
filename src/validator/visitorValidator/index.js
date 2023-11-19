const InvariantError = require('../../exceptions/InvariantError');
const PostVisitorSchema = require('./schema');

const VisitorValidator = {
  validateVisitorPayload: (payload) => {
    const validatorResult = PostVisitorSchema.validate(payload);
    if (validatorResult.error) {
      throw new InvariantError(validatorResult.error.message);
    }
  },
};

module.exports = VisitorValidator;
