/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('partner_details', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'partner_details',
    createdAt: false,
    updatedAt: false
  });
};
