/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ether_transcations', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    from_address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    to_address: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    time_stamp: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    block_number: {
      type: DataTypes.BIGINT,
      allowNull: false
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
    transcation_hash: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'ether_transcations',
    createdAt: false,
    updatedAt: false

  });
};
