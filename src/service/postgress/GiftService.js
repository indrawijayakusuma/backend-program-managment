const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');

class GiftService {
  constructor() {
    this.pool = new Pool();
  }

  async getGift(type) {
    const query = {
      text: 'SELECT id, name FROM gifts WHERE type = $1',
      values: [type],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Hadiah tidak ditemukan');
    }
    return result.rows;
  }
}

module.exports = GiftService;
