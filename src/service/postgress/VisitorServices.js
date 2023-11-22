const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class VisitorServices {
  constructor(customerService) {
    this.pool = new Pool();
    this.customerService = customerService;
  }

  async getVisitor({ search, limit, page }) {
    const limitNum = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    const searchAdd = `%${search}%`;
    let query;

    if (search) {
      query = {
        text: `SELECT customers.no_ktp, customers.name, customers.rekening, visitors.setoran, COUNT(customers.no_ktp) over() as total 
        FROM visitors INNER JOIN customers ON visitors.no_ktp = customers.no_ktp
        WHERE LOWER(customers.name) LIKE LOWER($1)
        OR LOWER(customers.no_ktp) LIKE LOWER($1)
        OR LOWER(customers.rekening) LIKE LOWER($1)
        OFFSET $2
        LIMIT $3`,
        values: [searchAdd, offset, limitNum],
      };
    } else {
      query = {
        text: `SELECT customers.no_ktp, customers.name, customers.rekening, visitors.setoran, COUNT(customers.no_ktp) over() as total 
        FROM visitors INNER JOIN customers ON visitors.no_ktp = customers.no_ktp
        OFFSET $1
        LIMIT $2`,
        values: [offset, limitNum],
      };
    }

    const result = await this.pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Visitor tidak ditemukan');
    }
    const visitors = result.rows.map((row) => ({
      noKtp: row.no_ktp,
      name: row.name,
      rekening: row.rekening,
      setoran: row.setoran,
    }));

    const { total } = result.rows[0];
    const numTotal = parseInt(total, 10);
    const totalPage = Math.ceil(total / limitNum);
    const startIndex = (page - 1) * limit + 1;
    const endIndex = visitors.length + startIndex - 1;

    return {
      totalRows: numTotal,
      startIndex,
      endIndex,
      totalPage,
      visitors,
    };
  }

  async addVisitor({
    noKtp, setoran, name, rekening,
  }) {
    const query = {
      text: 'INSERT INTO visitors VALUES ($1, $2) returning no_ktp',
      values: [noKtp, setoran],
    };
    await this.customerService.addCustomer(noKtp, name, rekening, 'visitor');
    const result = await this.pool.query(query);
    if (!result.rows[0].no_ktp) {
      throw new InvariantError('Gagal menambahkan visitor');
    }
    return result.rows[0];
  }
}

module.exports = VisitorServices;
