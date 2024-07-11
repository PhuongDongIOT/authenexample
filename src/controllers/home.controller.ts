import { Request, Response } from "express";
import { responseSucceed, responseStatus } from '@/exceptions'

export function welcome(request: Request, response: Response): Response {
  return responseStatus(response, 200, responseSucceed({ message: "Welcome to bezkoder application." }))
}
