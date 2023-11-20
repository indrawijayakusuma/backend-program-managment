class GiftHandler {
  constructor(service) {
    this.service = service;
  }

  async getGifts(request, h) {
    const { type } = request.params;
    const gift = await this.service.getGift(type);
    return h.response({
      status: 'success',
      data: gift,
    });
  }
}

module.exports = GiftHandler;
