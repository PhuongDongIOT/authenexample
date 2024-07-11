import HttpException from './HttpException'

class ResponseSucceedException extends HttpException {
  constructor(data: any) {
    super(200, '', data)
  }
}

function responseSucceed(data: any) {
  const response = new ResponseSucceedException(data)
  return response
}

export { ResponseSucceedException, responseSucceed }
