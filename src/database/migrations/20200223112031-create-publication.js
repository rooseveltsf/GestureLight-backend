module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('publications', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      image_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'images', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: false,
      },
      address_post: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 6),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('publications');
  },
};
