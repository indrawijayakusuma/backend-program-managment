const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class RedeemCodeService {
  constructor() {
    this.pool = new Pool();
  }

  async addRedeemCode(noKtp) {
    const id = nanoid(10);
    const code = `${noKtp.substring(0, 5)}-${nanoid(5)}`;
    const query = {
      text: 'INSERT INTO redeem_codes VALUES ($1, $2, $3, $4) returning id',
      values: [id, code, false, noKtp],
    };
    const result = await this.pool.query(query);
    if (!result.rows[0].id) {
      throw new Error('Gagal menambahkan redeem code');
    }
    return result.rows[0];
  }

  async getAllRedeemCode() {
    const query = {
      text: `SELECT redeem_codes.code, redeem_codes."isUsed", customers.name, customers.rekening
      FROM redeem_codes
      LEFT JOIN customers ON redeem_codes.no_ktp = customers.no_ktp
      WHERE redeem_codes."isUsed" = false`,
      values: [],
    };
    const result = await this.pool.query(query);
    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan redeem code');
    }
    return result.rows;
  }

  async getRedeemCode(noKtp) {
    const query = {
      text: 'SELECT * FROM redeem_codes WHERE no_ktp = $1',
      values: [noKtp],
    };
    const result = await this.pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('KTP tidak valid atau belum terdaftar');
    }
    return result.rows;
  }

  async updateStatusRedeemCode(noKtp) {
    const { code } = await this.getRedeemCode(noKtp);
    const query = {
      text: 'UPDATE redeem_codes SET "isUsed" = true WHERE code = $1 returning id',
      values: [code],
    };
    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new Error('Gagal mendapatkan redeem code');
    }
  }
}

module.exports = RedeemCodeService;
