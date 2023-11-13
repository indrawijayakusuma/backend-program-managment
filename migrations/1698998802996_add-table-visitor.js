/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('visitors', {
    no_ktp: {
      type: 'VARCHAR(16)',
      primaryKey: true,
    },
    setoran: {
      type: 'INT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('visitors');
};
