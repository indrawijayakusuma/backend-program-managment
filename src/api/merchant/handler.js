class MerchantHandler {
  constructor(service, redeemCodeService, validator) {
    this.validator = validator;
    this.service = service;
    this.redeemCodeService = redeemCodeService;
  }

  async getMerchants() {
    const merchants = await this.service.getMerchant();
    return {
      status: 'success',
      data: {
        merchants,
      },
    };
  }

  async postMerchant(request, h) {
    const {
      no_ktp: noKtp,
      name,
      rekening,
      merchant_name: merchantName,
      no_booth: noBooth,
    } = request.payload;
    this.validator.validateMerchantPayload(request.payload);

    await this.service.addMerchant({
      noKtp,
      name,
      rekening,
      merchantName,
      noBooth,
    });
    await this.redeemCodeService.addRedeemCode(noKtp);

    const response = h.response({
      status: 'success',
      message: 'merchant has been added',
    });
    response.code(201);

    return response;
  }
}

module.exports = MerchantHandler;
