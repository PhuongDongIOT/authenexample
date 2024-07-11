import { Request } from 'express'
import { IUser } from '@/models/auth.model'

interface RequestWithUser extends Request {
    user: IUser
}

export { RequestWithUser }
