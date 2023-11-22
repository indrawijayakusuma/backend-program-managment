const InvariantError = require('../../exceptions/InvariantError');
const PostGiftSchema = require('./schema');

module.exports = {
  validatePostGift: (payload) => {
    const validatorResult = PostGiftSchema.validate(payload);
    if (validatorResult.error) {
      throw new InvariantError(validatorResult.error.message);
    }
  },
};
