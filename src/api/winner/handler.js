class WinnerHandler {
  constructor(service) {
    this.service = service;
  }

  async postWinner(request, h) {
    const { giftId, no_ktp: noKtp } = request.payload;
    await this.service.ValidateWinnersByKtp(noKtp);
    await this.service.addWinner(giftId, noKtp);

    const response = h.response({
      status: 'success',
      message: 'winner has been added',
    });
    response.code(201);
    return response;
  }

  async getWinners(request, h) {
    const result = await this.service.getWinners();
    return h.response({
      status: 'success',
      data: result,
    });
  }
}

module.exports = WinnerHandler;
