const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class MerchantService {
  constructor(customerService) {
    this.pool = new Pool();
    this.customerService = customerService;
  }

  async getMerchant({ search, limit, page }) {
    const limitNum = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    const searchAdd = `%${search}%`;
    let query;

    if (search) {
      query = {
        text: `SELECT customers.no_ktp, customers.name, customers.rekening, merchants.merchant_name, merchants.no_booth, COUNT(customers.no_ktp) over() as total 
            FROM merchants INNER JOIN customers ON merchants.no_ktp = customers.no_ktp
            WHERE LOWER(customers.name) LIKE LOWER($1)
            OR LOWER(customers.no_ktp) LIKE LOWER($1)
            OR LOWER(customers.rekening) LIKE LOWER($1)
            OR LOWER(merchants.merchant_name) LIKE LOWER($1)
            OFFSET $2
            LIMIT $3`,
        values: [searchAdd, offset, limitNum],
      };
    } else {
      query = {
        text: `SELECT customers.no_ktp, customers.name, customers.rekening, merchants.merchant_name, merchants.no_booth, COUNT(customers.no_ktp) over() as total 
        FROM merchants INNER JOIN customers ON merchants.no_ktp = customers.no_ktp
        OFFSET $1
        LIMIT $2`,
        values: [offset, limitNum],
      };
    }

    const result = await this.pool.query(query);
    const merchants = result.rows.map((row) => ({
      noKtp: row.no_ktp,
      name: row.name,
      rekening: row.rekening,
      merchantName: row.merchant_name,
      noBooth: row.no_booth,
    }));
    const { total } = result.rows[0];
    const numTotal = parseInt(total, 10);
    const totalPage = Math.ceil(total / limitNum);
    const startIndex = (page - 1) * limit + 1;
    const endIndex = merchants.length + startIndex - 1;

    return {
      totalRows: numTotal,
      startIndex,
      endIndex,
      totalPage,
      merchants,
    };
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
