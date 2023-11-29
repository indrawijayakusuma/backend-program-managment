const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsService {
  constructor() {
    this.pool = new Pool();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO auth VALUES($1)',
      values: [token],
    };
    await this.pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT refresh_token FROM auth WHERE refresh_token = $1',
      values: [token],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM auth WHERE refresh_token = $1',
      values: [token],
    };

    await this.pool.query(query);
  }
}

module.exports = AuthenticationsService;
