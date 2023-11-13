import { Pool } from 'pg';

class GiftService {
  constructor() {
    this.pool = new Pool();
  }

  async getGift() {
    const query = {
      text: 'SELECT name FROM gifts',
      values: [],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan gift');
    }
    return result.rows;
  }
}

export default GiftService;
