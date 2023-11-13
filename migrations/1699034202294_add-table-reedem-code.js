/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('redeem_codes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    code: {
      type: 'TEXT',
      notNull: true,
    },
    isUsed: {
      type: 'BOOLEAN',
      notNull: true,
    },
    no_ktp: {
      type: 'VARCHAR(16)',
      notNull: true,
    },
  });

  pgm.addConstraint('redeem_codes', 'fk_redeem_codes.no_ktp_customers.no_ktp', 'FOREIGN KEY(no_ktp) REFERENCES customers(no_ktp) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('redeem_codes');
};
