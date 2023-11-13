class VisitorHandler {
  constructor(visitorService, redeemCodeService) {
    this.visitorService = visitorService;
    this.redeemCodeService = redeemCodeService;
  }

  async getVisitor() {
    const visitor = await this.visitorService.getVisitor();
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
