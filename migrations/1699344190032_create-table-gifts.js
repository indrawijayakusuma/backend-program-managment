/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('gifts', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
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
  pgm.dropTable('gifts');
};
