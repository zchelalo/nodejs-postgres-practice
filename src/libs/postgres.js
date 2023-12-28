import { config } from "../config/config.js"
import pkg from 'pg'
const { Pool } = pkg

const PG_USER = encodeURIComponent(config.PG_USER)
const PG_PASS = encodeURIComponent(config.PG_PASS)
const URI = `postgres://${PG_USER}:${PG_PASS}@${config.PG_HOST}:${config.PG_PORT}/${config.PG_DB}`

const pool = new Pool({ connectionString: URI })

export { pool }