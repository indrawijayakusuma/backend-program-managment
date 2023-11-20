/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('merchants', {
    no_ktp: {
      type: 'VARCHAR(16)',
      primaryKey: true,
    },
    merchant_name: {
      type: 'TEXT',
      notNull: true,
    },
    no_booth: {
      type: 'INT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('merchants');
};
