import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import {WrongAuthenticationTokenException, AuthenticationTokenMissingException} from '@/exceptions'
import {DataStoredInToken, RequestWithUser} from '@/interfaces'
import authRepository from '@/authentication/auth.repository'

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const headers = request.headers
  const {authorization} = headers

  if (authorization) {
    const secret = process.env.JWT_SECRET
    try {
      const verificationResponse = jwt.verify(authorization, secret) as DataStoredInToken
      const code = verificationResponse.code
      const user = await authRepository.findById(code)
      if (user) {
        request.user = user
        next()
      } else {
        response.json(new WrongAuthenticationTokenException())
      }
    } catch (error) {
        response.json(new WrongAuthenticationTokenException())
    }
  } else {
    response.json(new AuthenticationTokenMissingException())
  }
}

export default authMiddleware