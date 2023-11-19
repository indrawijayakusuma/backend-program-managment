/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('winners', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    gift_id: {
      type: 'TEXT',
      notNull: true,
    },
    no_ktp: {
      type: 'VARCHAR(16)',
      notNull: true,
      unique: true,
    },
    image: {
      type: 'TEXT',
      notNull: true,
    },
    date: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint('winners', 'fk_winners.no_ktp_customers.no_ktp', 'FOREIGN KEY(no_ktp) REFERENCES customers(no_ktp) ON DELETE CASCADE');
  pgm.addConstraint('winners', 'fk_winners.gift_id_gifts.id', 'FOREIGN KEY(gift_id) REFERENCES gifts(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('winners');
};
