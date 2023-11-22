class RedeemCodeHandler {
  constructor(service) {
    this.service = service;
  }

  async getRedeemCode(request, h) {
    const { noKtp } = request.params;
    const result = await this.service.getRedeemCode(noKtp);
    return h.response({
      status: 'success',
      data: result,
    });
  }

  async getAllRedeemCode(request, h) {
    const { search } = request.query;
    const result = await this.service.getAllRedeemCode({ search });
    return h.response({
      status: 'success',
      data: result,
    });
  }
}

module.exports = RedeemCodeHandler;
