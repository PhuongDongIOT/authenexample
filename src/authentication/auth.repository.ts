import { OkPacket } from 'mysql2'
import * as jwt from 'jsonwebtoken'
import connection from '@/lib/database'
import { logger } from '@/lib/logger'
import { fuctionBcryptMidleware } from '@/middlewares/bcrypt.midleware'
import type { IUser, IUserLogin } from '@/models/auth.model'
import type { IPagination } from '@/models/pagination.model'
import { TokenData, DataStoredInToken } from '@/interfaces'
import { checkEmtyArray } from '@/utils'
import { characterCode } from './constant'


interface IAuthRepository {
  findOne(body: any): Promise<any>
  findById(code: string): Promise<any>
  findAll(query: IPagination): Promise<any>
  create(user: IUser): Promise<number>
  update(user: IUser): Promise<number>
}

class AuthRepository implements IAuthRepository {
  private bcrypt = fuctionBcryptMidleware
  private logger = logger

  public async checkLogin(body: any): Promise<boolean> {
    const isResponse: IUser = await this.findOne(body)
    let { password: passHash } = body
    const { password } = isResponse
    const checkAuth: boolean = await this.bcrypt().compare(password, passHash)
    return checkAuth
  }

  public async findOne(body: any, tx?: any): Promise<any> {
    const { email } = body
    try {
      const connect: any = tx ? tx : await connection()
      const [results] = await connect.query(
        'SELECT id_user, code, email, phone FROM `user` WHERE email = ? LIMIT 1',
        [email]
      )
      return results
    } catch (error) {
      this.logger.error(error)
      return error
    }
  }

  public async findById(code: string): Promise<any> {
    try {
      const connect = await connection()
      const [results] = await connect.query<OkPacket>(
        'SELECT id_user, code, email, phone FROM `user` WHERE code = ? LIMIT 1',
        [code]
      )
      return results
    } catch (error) {
      this.logger.error(error)
      return error
    }
  }

  public async findAll(request: any): Promise<any> {
    const body: IPagination = request.body
    let { keyword = '', limit = 25, page = 1 } = body
    let offset: number = page > 1 ? page * limit : page
    keyword = keyword + '%'

    try {
      const connect = await connection()
      const [results] = await connect.query<OkPacket>(
        'SELECT id_user, code, email, phone, full_address, name_gender FROM `user` LEFT JOIN `address` ON `user`.address_id = `address`.address_id INNER JOIN `gender` ON `user`.gender_id = `gender`.gender_id WHERE  name LIKE ? LIMIT ? OFFSET ?',
        [keyword, limit, offset]
      )
      
      return results
    } catch (error) {
      this.logger.error(error)
      return error
    }
  }

  public async signIn(request: any): Promise<any> {
    const body: IUserLogin = request.body
    let { email, password: pass } = body

    try {
      const sql = 'SELECT id_user, code, email, phone, password FROM `user` WHERE email = ? LIMIT 1'
      const values = [email]
      const connect = await connection()
      const [results] = await connect.query<OkPacket>(sql, values)
      if (checkEmtyArray(results)) {
        const { password } = results[0]
        
        const checkPassword = await this.bcrypt().compare(pass, password)
        if (!checkPassword) throw Error('Login failed')
        const tokenData = this.createToken(results[0])
        return {
          token: tokenData,
          ...results[0]
        }
      }
      throw Error('not login')
    } catch (error) {
      this.logger.error(error)
      return error
    }
  }

  public async create(request: any): Promise<any> {
    const body: IUser = request.body
    let { name, phone, email, birthdate, address, password, genderId = 1 } = body
    password = await this.bcrypt().hash(password)
    birthdate = new Date(birthdate)
    let addressId: number = 0

    const connect = await connection()
    await connect.query('START TRANSACTION')
    const dataCheck = await this.findOne(body, connect)
    if (checkEmtyArray(dataCheck)) throw Error('User has')

    const sqlId = 'SELECT id_user FROM `user` ORDER BY id_user DESC LIMIT 1'
    const [results] = await connect.query<OkPacket>(sqlId)

    let codeUser: string = characterCode.auth
    if (checkEmtyArray(results)) {
      codeUser = codeUser + `${results[0].id_user}`
    }

    try {
      if (address) {
        const sqlAdress = 'INSERT INTO `address`(`full_address`) VALUES (?)'
        const valuesAdress = [address]
        const [results] = await connect.query<OkPacket>(sqlAdress, valuesAdress)
        if (checkEmtyArray(results)) {
          addressId = results[0].address_id	
        }
      }

      const sql = 'INSERT INTO `user`(`code`, `name`, `phone`,`birthdate`, `email`, `password`, `address_id`, `gender_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      const values = [codeUser, name, phone, birthdate, email, password, addressId, genderId]
      const [results] = await connect.query<OkPacket>(sql, values)
      await connect.query('COMMIT')
      return results
    } catch (error) {
      await connect.query('ROLLBACK')
      this.logger.error(error)
      return error
    }
  }

  public async update(request: any): Promise<any> {
    const body: IUser = request.body
    let { code, name, phone, email, birthdate, address, genderId = 1 } = body
    birthdate = new Date(birthdate)
    let addressId: number = 0

    const connect = await connection()
    await connect.query('START TRANSACTION')
    const sqlId = 'SELECT id_user, address_id FROM `user` ORDER BY id_user DESC LIMIT 1'
    const [results] = await connect.query<OkPacket>(sqlId)

    let codeUser: string = characterCode.auth
    if (checkEmtyArray(results)) {
      codeUser = codeUser + `${results[0].id_user}`
      addressId = results[0].address_id
    }

    try {
      if (address) {
        const sqlAdress = 'INSERT INTO `address`(`full_address`) VALUES (?)'
        const valuesAdress = [address]
        const [results] = await connect.query<OkPacket>(sqlAdress, valuesAdress)
        if (checkEmtyArray(results)) {
          addressId = results[0].address_id	
        }
      }

      const sql = 'UPDATE `user` SET name = ?, phone = ?, birthdate = ?, email = ?, address_id = ? , gender_id = ? WHERE code = ? '
      const values = [name, phone, birthdate, email, addressId, genderId, code]
      const [results] = await connect.query<OkPacket>(sql, values)
      await connect.query('COMMIT')
      return results
    } catch (error) {
      await connect.query('ROLLBACK')
      this.logger.error(error)
      return error
    }
  }

  public async delete(request: any): Promise<any> {
    const body: IUser = request.body
    const { code } = body
    try {
      const sql = 'UPDATE `user` SET is_deleted = 1 WHERE code = ?'
      const values = [code]
      const connect = await connection()
      const [results] = await connect.query<OkPacket>(sql, values)
      return results
    } catch (error) {
      this.logger.error(error)
      return error
    }
  }

  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token} HttpOnly Max-Age=${tokenData.expiresIn}`
  }

  public createToken(user: IUser): TokenData {
    const expiresIn = 60 * 60 // an hour
    const secret = process.env.JWT_SECRET
    const dataStoredInToken: DataStoredInToken = {
      code: user.code,
    }
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    }
  }
}

export default new AuthRepository()
