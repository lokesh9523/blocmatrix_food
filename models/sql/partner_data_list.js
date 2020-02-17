/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('partner_data_list', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email_count: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email_cleaned: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    active: {
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
    tableName: 'partner_data_list',
    createdAt: false,
    updatedAt: false
  });
};
