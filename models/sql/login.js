/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('login', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mobile_number: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'login',
    createdAt: false,
    updatedAt: false
  });
};
