const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class CusttomerService {
  constructor() {
    this.pool = new Pool();
  }

  async addCustomer(noKtp, name, rekening, type) {
    const query = {
      text: 'INSERT INTO customers VALUES ($1, $2, $3, $4) returning no_ktp',
      values: [noKtp, name, rekening, type],
    };

    const result = await this.pool.query(query);
    if (!result.rows[0].no_ktp) {
      throw new InvariantError('Gagal menambahkan customer');
    }
    return result.rows[0];
  }

  async getCustomerByRedeemCode(code) {
    const query = {
      text: 'SELECT customers.name, customers.rekening, customers.no_ktp, customers.type FROM customers RIGHT JOIN redeem_codes ON customers.no_ktp = redeem_codes.no_ktp WHERE redeem_codes.code = $1 AND redeem_codes."isUsed" = false',
      values: [code],
    };

    const result = await this.pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('QR-code tidak valid atau sudah digunakan');
    }
    return result.rows[0];
  }
}

module.exports = CusttomerService;
