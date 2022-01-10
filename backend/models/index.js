const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

db.User.hasMany(db.Post, { onDelete: 'CASCADE' });
db.Post.belongsTo(db.User, { foreignKey: 'userID', onDelete: 'CASCADE' });

db.Post.hasMany(db.Comment, { onDelete: 'CASCADE' });
db.Comment.belongsTo(db.Post, { foreignKey: 'postID', onDelete: 'CASCADE' });
db.Comment.belongsTo(db.User, { foreignKey: 'userID', onDelete: 'CASCADE' });

module.exports = db;


 
