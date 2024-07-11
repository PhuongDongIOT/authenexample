import { NextFunction, Request } from 'express'
import { logger } from '@/lib/logger'

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  logger.info(`${request.method} ${request.path}`)
  next()
}

export default loggerMiddleware