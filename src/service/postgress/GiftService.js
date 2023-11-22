const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const NotFoundError = require('../../exceptions/NotFoundError');
const InvariantError = require('../../exceptions/InvariantError');

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

  async getAllGift() {
    const query = {
      text: 'SELECT id, name, type FROM gifts',
      values: [],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async addGift(name, type) {
    const id = nanoid(10);
    const query = {
      text: 'INSERT INTO gifts VALUES ($1, $2, $3) returning id',
      values: [id, name, type],
    };

    const result = await this.pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan hadiah');
    }
    return result.rows[0];
  }
}

module.exports = GiftService;
