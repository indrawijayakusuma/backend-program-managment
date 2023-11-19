const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class VisitorServices {
  constructor(customerService) {
    this.pool = new Pool();
    this.customerService = customerService;
  }

  async getVisitor() {
    const query = {
      text: 'SELECT customers.no_ktp, customers.name, customers.rekening, visitors.setoran FROM visitors JOIN customers ON visitors.no_ktp = customers.no_ktp',
      values: [],
    };

    const result = await this.pool.query(query);
    return result.rows.map((row) => ({
      no_ktp: row.no_ktp,
      name: row.name,
      rekening: row.rekening,
      setoran: row.setoran,
    }));
  }

  async addVisitor({
    noKtp, setoran, name, rekening,
  }) {
    const query = {
      text: 'INSERT INTO visitors VALUES ($1, $2) returning no_ktp',
      values: [noKtp, setoran],
    };
    await this.customerService.addCustomer(noKtp, name, rekening);
    const result = await this.pool.query(query);
    if (!result.rows[0].no_ktp) {
      throw new InvariantError('Gagal menambahkan visitor');
    }
    return result.rows[0];
  }
}

module.exports = VisitorServices;
