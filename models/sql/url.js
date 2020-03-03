/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('url', {
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
    status: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
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
    tableName: 'url',
    createdAt: false,
    updatedAt: false
  });
};
