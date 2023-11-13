class CustomerHandler {
  constructor(service) {
    this.service = service;
  }

  async getCustomerByRedeemCode(request, h) {
    const { code } = request.params;
    const result = await this.service.getCustomerByRedeemCode(code);
    return h.response({
      status: 'success',
      data: result,
    });
  }
}

module.exports = CustomerHandler;
