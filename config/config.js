module.exports = {
  development: {
    url: process.env.POSTGRES_URL,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: process.env.POSTGRES_URL,
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: process.env.POSTGRES_URL,
    dialect: "mysql",
  },
};
