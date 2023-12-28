import { config as conf } from "dotenv"

conf()

const config = {
  ENV: process.env.NODE_ENV || 'dev',
  PORT: process.env.PORT || 3000,
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_PORT: process.env.PG_PORT || 5432,
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASS: process.env.PG_PASS || '',
  PG_DB: process.env.PG_DB || 'mi_tienda'
}

export { config }