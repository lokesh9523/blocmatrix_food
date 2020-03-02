/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('domains', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    domain_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    speed_per_hour: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '1'
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'domains',
    createdAt: false,
    updatedAt: false
  });
};
