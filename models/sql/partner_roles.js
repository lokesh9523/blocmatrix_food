/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('partner_roles', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'partner_roles',
    createdAt: false,
    updatedAt: false
  });
};
