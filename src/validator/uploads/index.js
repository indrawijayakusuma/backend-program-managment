/* eslint-disable camelcase */
const InvariantError = require('../../exceptions/InvariantError');
const { ImageHeadersSchema, postPayloadSchema } = require('./schema');

const UploadsValidator = {
  validateImageHeaders: (headers) => {
    const validationResult = ImageHeadersSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePostWinnerPayload: ({ giftId, no_ktp, image }) => {
    const validatorResult = postPayloadSchema.validate({ giftId, no_ktp, image });
    if (validatorResult.error) {
      throw new InvariantError(validatorResult.error.message);
    }
  },
};

module.exports = UploadsValidator;
