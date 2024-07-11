export default {
  HOST: process.env.MYSQL_HOST,
  PORT: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
  USER: process.env.MYSQL_USER,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DB: process.env.MYSQL_DATABASE,
  LIMIT_RATE: parseInt(process.env.LIMIT_RATE) ?? 100,
  WINDOWMS: parseInt(process.env.WINDOWMS) ?? 900000
}
