/* eslint-disable prefer-const */
class VisitorHandler {
  constructor(visitorService, redeemCodeService, validator) {
    this.validator = validator;
    this.visitorService = visitorService;
    this.redeemCodeService = redeemCodeService;
  }

  async getVisitor(request) {
    let { search, page = 1, limit = 10 } = request.query;
    const visitor = await this.visitorService.getVisitor({ search, limit, page });
    return {
      status: 'success',
      data: {
        visitor,
      },
    };
  }

  async postVisitor(request, h) {
    const {
      no_ktp: noKtp,
      setoran,
      name,
      rekening,
    } = request.payload;
    this.validator.validateVisitorPayload(request.payload);
    await this.visitorService.addVisitor({
      noKtp,
      setoran,
      name,
      rekening,
    });
    await this.redeemCodeService.addRedeemCode(noKtp);

    const response = h.response({
      status: 'success',
      message: 'visitor has been added',
    });
    response.code(201);

    return response;
  }
}

module.exports = VisitorHandler;
