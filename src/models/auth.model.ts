import { RowDataPacket } from "mysql2"


interface IUser extends RowDataPacket {
  code: string
  name: string
  email: string
  phone: string
  address?: string
  birthdate?: Date
  genderId: number
  password: string
}

type IUserLogin = Pick<IUser, 'email' | 'password'>

interface IAddress {
  commune: string
  street: string
  district: string
  full_address: string
}

export type {
  IUser,
  IUserLogin,
  IAddress
}
