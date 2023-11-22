class GiftHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
  }

  async getGifts(request, h) {
    const { type } = request.params;
    const gift = await this.service.getGift(type);
    return h.response({
      status: 'success',
      data: gift,
    });
  }

  async getAllGifts(request, h) {
    const gift = await this.service.getAllGift();
    return h.response({
      status: 'success',
      data: gift,
    });
  }

  async postGift(request, h) {
    const { name, type } = request.payload;
    this.validator.validatePostGift(request.payload);
    const gift = await this.service.addGift(name, type);
    const response = h.response({
      status: 'success',
      data: gift,
    });
    response.code(201);
    return response;
  }
}

module.exports = GiftHandler;
