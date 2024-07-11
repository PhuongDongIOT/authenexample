import { Request, Response, NextFunction } from 'express'
import { z, ZodError } from 'zod'
import { StatusCodes } from 'http-status-codes'


export function validateMidleware(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, error: 'Invalid data', details: errorMessages })
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: StatusCodes.INTERNAL_SERVER_ERROR, error: 'Internal Server Error' })
      }
    }
  }
}