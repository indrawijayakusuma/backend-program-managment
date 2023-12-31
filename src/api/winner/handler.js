/* eslint-disable camelcase */
class WinnerHandler {
  constructor(service, storageService, imageValidator) {
    this.service = service;
    this.storageService = storageService;
    this.imageValidator = imageValidator;
  }

  async postWinner(request, h) {
    const { giftId, no_ktp, image } = request.payload;
    this.imageValidator.validatePostWinnerPayload({ giftId, no_ktp, image });
    this.imageValidator.validateImageHeaders(image.hapi.headers);
    await this.service.ValidateWinnersByKtp(no_ktp);

    const filename = await this.storageService.writeFile(image, image.hapi);
    const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/winners/images/${filename}`;
    await this.service.addWinner(giftId, no_ktp, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'winner has been added',
    });
    response.code(201);
    return response;
  }

  async getWinners(request, h) {
    const { search, page = 1, limit = 10 } = request.query;
    const result = await this.service.getWinners({ search, limit, page });
    return h.response({
      status: 'success',
      data: result,
    });
  }

  async getWinnersByKtp(request, h) {
    const { ktp } = request.params;
    const result = await this.service.getWinnersByKtp(ktp);
    return h.response({
      status: 'success',
      data: result,
    });
  }
}

module.exports = WinnerHandler;
