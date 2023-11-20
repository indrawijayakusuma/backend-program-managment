const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class WinnerService {
  constructor(redeemCodeService) {
    this.pool = new Pool();
    this.redeemCodeService = redeemCodeService;
  }

  async addWinner(giftId, noKtp, image) {
    const id = nanoid(10);
    const date = new Date();
    const query = {
      text: 'INSERT INTO winners VALUES ($1, $2, $3, $4, $5) returning id',
      values: [id, giftId, noKtp, image, date],
    };

    await this.pool.query('Update redeem_codes SET "isUsed" = true WHERE no_ktp = $1', [noKtp]);
    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan winner');
    }
    return result.rows[0].id;
  }

  async getWinners() {
    const query = {
      text: 'SELECT customers.name, customers.rekening, customers.type, gifts.name as gift, winners.date, winners.image FROM winners LEFT JOIN customers ON winners.no_ktp = customers.no_ktp LEFT JOIN gifts ON winners.gift_id = gifts.id',
      values: [],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getWinnersByKtp(ktp) {
    const query = {
      text: 'SELECT customers.name, customers.rekening, customers.type, gifts.name as gift, winners.date, winners.image FROM winners LEFT JOIN customers ON winners.no_ktp = customers.no_ktp LEFT JOIN gifts ON winners.gift_id = gifts.id WHERE winners.no_ktp = $1',
      values: [ktp],
    };
    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('peserta dengan ktp tersebut belum mendapatkan hadiah atau tidak valid');
    }
    return result.rows[0];
  }

  async ValidateWinnersByKtp(noKtp) {
    const query = {
      text: 'SELECT * FROM winners WHERE no_ktp = $1',
      values: [noKtp],
    };

    const result = await this.pool.query(query);
    if (result.rowCount) {
      throw new InvariantError('peserta dengan ktp tersebut telah mendapatkan hadiah');
    }
  }
}

module.exports = WinnerService;
