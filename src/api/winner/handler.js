/* eslint-disable camelcase */
class WinnerHandler {
  constructor(service, storageService, imageValidator) {
    this.service = service;
    this.storageService = storageService;
    this.imageValidator = imageValidator;
  }

  async postWinner(request, h) {
    const { giftId, no_ktp, image } = request.payload;
    console.log(request.payload);
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
    const result = await this.service.getWinners();
    return h.response({
      status: 'success',
      data: result,
    });
  }
}

module.exports = WinnerHandler;
