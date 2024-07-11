import { Request } from 'express'
import authRepository from "@/authentication/auth.repository"
import { logger } from '@/lib/logger'


export class AuthService {
    private log = logger

    constructor() { }

    public parseBasicAuthFromRequest(req: Request): { username: string, password: string } {
        const authorization = req.header('authorization')

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Credentials provided by the client')
            const decodedBase64 = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii')
            const username = decodedBase64.split(':')[0]
            const password = decodedBase64.split(':')[1]
            if (username && password) {
                return { username, password }
            }
        }

        this.log.info('No credentials provided by the client')
        return undefined
    }

    public async validateUser(username: string, password: string): Promise<any> {
        return undefined
    }

}