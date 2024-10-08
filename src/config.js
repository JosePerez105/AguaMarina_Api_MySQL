import {config} from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'aguamarina_db'
export const DB_PORT = process.env.DB_PORT || 3306
export const SECRET_JWT = process.env.SECRET_JWT || 'secret_jwt'
export const USER_MAIL = process.env.USER_MAIL
export const PASS_APP_MAIL = process.env.PASS_APP_MAIL
