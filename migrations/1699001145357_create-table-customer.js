/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('customers', {
    no_ktp: {
      type: 'VARCHAR(16)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    rekening: {
      type: 'TEXT',
      notNull: true,
    },
    type: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('customers');
};
