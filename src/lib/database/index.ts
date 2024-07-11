import * as mysql from 'mysql2/promise'
import dbConfig from "@/config/db.config"

const connection = async() => {
  const connect = await mysql.createPool({
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  })
  return connect
}

export default connection

