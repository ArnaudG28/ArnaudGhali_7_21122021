module.exports = {
    HOST: "localhost",
    USER: "adminP7",
    PASSWORD: "adminP7",
    DB: "Groupomania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };