const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class MerchantService {
  constructor(customerService) {
    this.pool = new Pool();
    this.customerService = customerService;
  }

  async getMerchant() {
    const query = {
      text: `SELECT customers.no_ktp, customers.name, customers.rekening, merchants.merchant_name, merchants.no_booth 
      FROM merchants INNER JOIN customers ON merchants.no_ktp = customers.no_ktp`,
      values: [],
    };

    const result = await this.pool.query(query);
    return result.rows.map((row) => ({
      noKtp: row.no_ktp,
      name: row.name,
      rekening: row.rekening,
      merchantName: row.merchant_name,
      noBooth: row.no_booth,
    }));
  }

  async addMerchant({
    noKtp, name, rekening, merchantName, noBooth,
  }) {
    const query = {
      text: 'INSERT INTO merchants VALUES ($1, $2, $3) returning no_ktp',
      values: [noKtp, merchantName, noBooth],
    };
    await this.customerService.addCustomer(noKtp, name, rekening, 'merchant');
    const result = await this.pool.query(query);
    if (!result.rows[0].no_ktp) {
      throw new InvariantError('Gagal menambahkan visitor');
    }
    return result.rows[0];
  }
}

module.exports = MerchantService;
